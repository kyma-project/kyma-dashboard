ARG WEB_IMAGE
ARG ENV

FROM europe-docker.pkg.dev/kyma-project/prod/busola-web:${WEB_IMAGE}

COPY  ./environments/${ENV}/dist/extensions.yaml /app/core-ui/extensions/extensions.yaml
# COPY  ./environments/${ENV}/dist/statics.yaml /app/core-ui/extensions/statics.yaml
COPY  ./environments/${ENV}/dist/wizards.yaml /app/core-ui/extensions/wizards.yaml

COPY  ./environments/${ENV}/config.yaml /app/core-ui/config/config.yaml

EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
