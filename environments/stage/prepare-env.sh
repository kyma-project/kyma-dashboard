WEB_IMAGE=
BACKEND_IMAGE=
LOCAL_IMAGE=

envsubst < Dockerfile.${TARGET} > environments/${ENV}/Dockerfile.${TARGET}
