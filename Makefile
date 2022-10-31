BASE_IMG_NAME=kyma-dashboard
REPO_IMG_DEV = $(DOCKER_PUSH_REPOSITORY)$(DOCKER_PUSH_DIRECTORY)/$(BASE_IMG_NAME)
TAG = $(DOCKER_TAG)

release-dev-web:
	TARGET=web ENV=dev make build
	TARGET=web ENV=dev make push

release-dev-backend:
	TARGET=backend ENV=dev make build
	TARGET=backend ENV=dev make push

release-stage-web:
	TARGET=web ENV=stage make build
	TARGET=web ENV=stage make push

release-stage-backend:
	TARGET=backend ENV=stage make build
	TARGET=backend ENV=stage make push

release-prod-web:
	TARGET=web ENV=prod make build
	TARGET=web ENV=prod make push

release-prod-backend:
	TARGET=backend ENV=prod make build
	TARGET=backend ENV=prod make push

build:
	$(eval LOCAL_TAG := $(BASE_IMG_NAME)-$(TARGET)-$(ENV))

	docker build -t $(LOCAL_TAG) --build-arg TARGET_ENV=$(ENV) -f Dockerfile.$(TARGET) .

push:
	$(eval LOCAL_TAG := $(BASE_IMG_NAME)-$(TARGET)-$(ENV))
	$(eval EXTERNAL_TAG := $(REPO_IMG_DEV)-$(TARGET)-$(ENV):$(TAG))

	docker tag $(LOCAL_TAG) $(EXTERNAL_TAG)
	docker push $(EXTERNAL_TAG)
