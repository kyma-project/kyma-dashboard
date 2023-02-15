# Kyma-Dashboard

## Overview (mandatory)

This project contains configuration and extensions neccessary to deploy [Busola](https://github.com/kyma-project/busola) on dev, stage and prod environments.

## Prerequisites

- [`npm`](https://www.npmjs.com/) in version 8.1.2 or higher
- [`node`](https://nodejs.org/en/) in version 16.13.2 or higher
- [`docker`](https://www.docker.com/)

## Installation

To install dependencies, run the `npm install` command.

## Usage

You can run Kyma Dashboard locally with configuration of one of following enviroments: . First prepare extensions for the environment you wish to access: `dev`, `stage` or `prod`. 
Then build docker image for the same `env`. 
Finally run coresponding docker image.

```bash
ENV=$ENV make prepare-extensions-image

TARGET=local ENV=$ENV make build

docker run --rm -it -p 3001:3001 -e DOCKER_DESKTOP_CLUSTER=true --pid=host --name kyma-dashboard kyma-dashboard-local-$ENV
```

To run Kyma Dashboard from a PR run this command
```bash
docker run --rm -it -p 3001:3001 -e DOCKER_DESKTOP_CLUSTER=true --pid=host --name kyma-dashboard eu.gcr.io/kyma-project/kyma-dashboard-local-dev:PR-$PR_NUMBER
```

## Development

### Contribution

When developing new extensions in Kyma Dashboard, adhere to the following rules. 

1. Add new extensions to the `extensions/$API_GROUP` directory.

2. Configure extension in `environments/dev/extensions.json`. Do the same for `stage` and `prod` environments.

3. Add test for the extension in `tests` directory

4. Make sure to add smoke tests for your extension in `tests/tests/cluster/test-check-extensions.spec.js` or `tests/tests/namespace/test-check-extensions.spec.js` files.

### Run tests

For the information on how to run tests and configure them, go to the [`tests`](./tests) directory.
