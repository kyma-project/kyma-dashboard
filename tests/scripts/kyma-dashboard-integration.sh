#!/bin/bash

set -e
export CYPRESS_DOMAIN=http://localhost:3001
export NO_COLOR=1
export REPO_IMG_DEV="k3d-registry.localhost:5000/kyma-dashboard"
export TAG="test-dev"
OS="$(uname -s)"
ARCH="$(uname -m)"

apt-get update -y 
apt-get install -y gettext-base

function deploy_k3d_kyma (){
curl -sSLo kyma.tar.gz "https://github.com/kyma-project/cli/releases/latest/download/kyma_${OS}_${ARCH}.tar.gz"
tar -zxvf kyma.tar.gz
chmod +x ./kyma

echo "Provisioning k3d cluster for Kyma"
./kyma provision k3d --ci

./kyma deploy

./kyma alpha deploy

echo "Apply and enable keda module"
kubectl apply -f https://github.com/kyma-project/keda-manager/releases/latest/download/moduletemplate.yaml

echo "Apply gardener resources"
echo "Certificates"
kubectl apply -f https://raw.githubusercontent.com/gardener/cert-management/master/pkg/apis/cert/crds/cert.gardener.cloud_certificates.yaml
echo "DNS Providers"
kubectl apply -f https://raw.githubusercontent.com/gardener/external-dns-management/master/pkg/apis/dns/crds/dns.gardener.cloud_dnsproviders.yaml
echo "DNS Entries"
kubectl apply -f https://raw.githubusercontent.com/gardener/external-dns-management/master/pkg/apis/dns/crds/dns.gardener.cloud_dnsentries.yaml
echo "Issuers"
kubectl apply -f https://raw.githubusercontent.com/gardener/cert-management/master/pkg/apis/cert/crds/cert.gardener.cloud_issuers.yaml

k3d kubeconfig get kyma > tests/fixtures/kubeconfig.yaml
}

function build_and_run_busola() {
echo "Create k3d registry..."
k3d registry create registry.localhost --port=5000

echo "Make release-dev..."
make release-dev

echo "Running kyma-dashboard..."
docker run -d --rm --net=host --pid=host --name kyma-dashboard "$REPO_IMG_DEV-local-dev:$TAG"

echo "waiting for server to be up..."
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' "$CYPRESS_DOMAIN")" != "200" ]]; do sleep 5; done
sleep 10
}

deploy_k3d_kyma  &> $ARTIFACTS/kyma-alpha-deploy.log &
build_and_run_busola  &> $ARTIFACTS/busola-build.log &

echo 'Waiting for deploy_k3d_kyma and build_and_run_busola'
wait -n
echo "First process finished"
wait -n
echo "Second process finished"

cd tests
npm ci && npm run "test:$SCOPE"
