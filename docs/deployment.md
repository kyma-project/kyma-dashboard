# Deployment model

## Makefile targets

- `release-{ENV}`: consists of steps:
    - Build local `prepare-extensions-image` with the extensions from current environment. This image will be used during the next steps.
    - Build and push frontend image: `extensions.yaml` and `config.yaml` are added.
    - Build and push backend image: `config.yaml` is added.
    - Build and push local iamge: `extensions.yaml` and `config.yaml` are added.

- `build` - requires `ENV` (dev, stage, prod) and `TARGET` (web, backend, frontend) variables. Transforms normal Busola images into Kyma-Dashboard images by adding `config.yaml` (and `extensions.yaml`, for frontend (`web`) and standalone Docker (`local`)). The environment (`ENV`) and the image version are read from environment-specific `env` file.

- `push` - requires `ENV` (dev, stage, prod) and `TARGET` (web, backend, frontend) variables. Tags and pushes the image create on `build` stage.

## Deploying `dev`

`kyma-dashboard` repository watches the `busola` repository (TODO) and when change occurs, it pulls the created images () and creates kyma-dashboard 