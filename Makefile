BASE_IMG_NAME=kyma-dashboard
REPO_IMG_DEV ?= europe-docker.pkg.dev/kyma-project/dev/$(BASE_IMG_NAME)
REPO_IMG_PROD = europe-docker.pkg.dev/kyma-project/prod/$(BASE_IMG_NAME)
TAG ?= $(DOCKER_TAG)

release-dev:
	ENV=dev make prepare-extensions-image
	TARGET=web ENV=dev make build
	TARGET=web ENV=dev make push
	TARGET=backend ENV=dev make build
	TARGET=backend ENV=dev make push
	TARGET=local ENV=dev make build
	TARGET=local ENV=dev make push

release-stage:
	ENV=stage make prepare-extensions-image
	TARGET=web ENV=stage make build
	TARGET=web ENV=stage make push
	TARGET=backend ENV=stage make build
	TARGET=backend ENV=stage make push
	TARGET=local ENV=stage make build
	TARGET=local ENV=stage make push

release-prod:
	ENV=prod make prepare-extensions-image
	TARGET=web ENV=prod make build
	TARGET=web ENV=prod make push
	TARGET=backend ENV=prod make build
	TARGET=backend ENV=prod make push
	TARGET=local ENV=prod make build
	TARGET=local ENV=prod make push

prepare-extensions-image:
	docker build -t extensions-local --build-arg ENV=$(ENV) -f Dockerfile.extensions .

build:
	$(eval LOCAL_TAG := $(BASE_IMG_NAME)-$(TARGET)-$(ENV))
	$(eval  include ./environments/${ENV}/env.sh)
	
	envsubst < Dockerfile.${TARGET} > environments/${ENV}/Dockerfile.${TARGET}
	
	docker build -t $(LOCAL_TAG) -f environments/$(ENV)/Dockerfile.$(TARGET) .
	rm environments/$(ENV)/Dockerfile.$(TARGET)

push:
ifeq ($(JOB_TYPE), postsubmit)
	$(eval LOCAL_TAG := $(BASE_IMG_NAME)-$(TARGET)-$(ENV))
	$(eval EXTERNAL_TAG := $(REPO_IMG_PROD)-$(TARGET)-$(ENV):$(TAG))
	$(eval LATEST_TAG := $(REPO_IMG_PROD)-$(TARGET)-$(ENV):latest)

	docker tag $(LOCAL_TAG) $(EXTERNAL_TAG) 
	docker tag $(LOCAL_TAG) $(LATEST_TAG)
	
	docker push $(EXTERNAL_TAG) 
	docker push $(LATEST_TAG)
else
	$(eval LOCAL_TAG := $(BASE_IMG_NAME)-$(TARGET)-$(ENV))
	$(eval EXTERNAL_TAG := $(REPO_IMG_DEV)-$(TARGET)-$(ENV):$(TAG))

	docker tag $(LOCAL_TAG) $(EXTERNAL_TAG) 
	docker push $(EXTERNAL_TAG) 
endif
