ARG LOCAL_IMAGE

FROM europe-docker.pkg.dev/kyma-project/dev/busola:${LOCAL_IMAGE}

ARG ENV

COPY --chown=65532:65532 ./environments/${ENV}/dist/extensions.yaml /app/core-ui/extensions/extensions.yaml
# COPY --chown=65532:65532 ./environments/${ENV}/dist/statics.yaml /app/core-ui/extensions/statics.yaml
COPY --chown=65532:65532 ./environments/${ENV}/dist/wizards.yaml /app/core-ui/extensions/wizards.yaml

COPY --chown=65532:65532 ./environments/${ENV}/config.yaml /app/core-ui/config/config.yaml
RUN yq eval -i '.config.features.KUBECONFIG_ID.config.kubeconfigUrl = "/kubeconfig"' core-ui/config/config.yaml

USER 65532:65532

EXPOSE 3001
ENV NODE_ENV=production ADDRESS=0.0.0.0 IS_DOCKER=true
CMD ["node", "backend-production.js"]
