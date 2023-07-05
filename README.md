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
docker run --rm -it -p 3001:3001 -e DOCKER_DESKTOP_CLUSTER=true --pid=host --name kyma-dashboard europe-docker.pkg.dev/kyma-project/dev/kyma-dashboard-local-dev:PR-$PR_NUMBER
```

## Development

### Contribution

For the information on how to contribute to this project, follow the [contributing](./CONTRIBUTING.md) guide.

### Run tests

For the information on how to run tests and configure them, go to the [`tests`](./tests) directory.
