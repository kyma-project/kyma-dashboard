#!/bin/bash

set -e
export CYPRESS_DOMAIN=http://localhost:3001
export NO_COLOR=1
export KUBECONFIG="$GARDENER_KYMA_PROW_KUBECONFIG"
export REPO_IMG_DEV="k3d-registry.localhost:5000/kyma-dashboard"
export TAG="test-dev"

apt-get update -y 
apt-get install -y gettext-base

k3d registry create registry.localhost --port=5000

cat << EOF | kubectl create -f - --raw "/apis/core.gardener.cloud/v1beta1/namespaces/garden-kyma-prow/shoots/nkyma/adminkubeconfig" | jq -r ".status.kubeconfig" | base64 -d > "kubeconfig--kyma--nkyma.yaml"
{
    "apiVersion": "authentication.gardener.cloud/v1alpha1",
    "kind": "AdminKubeconfigRequest",
    "spec": {
    "expirationSeconds": 10800
    }
}
EOF

cp kubeconfig--kyma--nkyma.yaml tests/kubeconfig.yaml

make release-dev

docker run --rm -it -p 3001:3001 -e DOCKER_DESKTOP_CLUSTER=true --pid=host --name kyma-dashboard "$REPO_IMG_DEV/kyma-dashboard-local-dev:$TAG"

echo "waiting for server to be up..."
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' "$CYPRESS_DOMAIN")" != "200" ]]; do sleep 5; done
sleep 10

cd tests
npm ci --no-optional && cypress run --browser chrome -C cypress.config.js