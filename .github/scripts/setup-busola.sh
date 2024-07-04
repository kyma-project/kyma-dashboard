#!/bin/bash

set -e
export TAG="test-${ENV}"
export REPO_IMG_DEV="k3d-registry.localhost:5000/kyma-dashboard"

echo "Create k3d registry..."
k3d registry create registry.localhost --port=5000

echo "Make release-${ENV}..."
make release-${ENV}

echo "Running kyma-dashboard..."
docker run -d --rm --net=host --pid=host --name kyma-dashboard "k3d-registry.localhost:5000/kyma-dashboard-local-${ENV}:test-${ENV}"

echo "waiting for server to be up..."
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' "http://localhost:3001")" != "200" ]]; do sleep 5; done
sleep 10