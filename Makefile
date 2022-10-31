BASE_IMG_NAME=kyma-dashboard
REPO_IMG_DEV = $(DOCKER_PUSH_REPOSITORY)$(DOCKER_PUSH_DIRECTORY)/$(BASE_IMG_NAME)
TAG = $(DOCKER_TAG)

release-web-dev: build-web-dev push-web-dev

build-web-dev:
	docker build -t $(BASE_IMG_NAME)-web-dev --build-arg TARGET_ENV=dev -f Dockerfile.web  .

push-web-dev:
	docker tag $(BASE_IMG_NAME)-web-dev $(REPO_IMG_DEV):$(TAG)
	docker push $(REPO_IMG_DEV)-web-dev:$(TAG)


release-backend-dev: build-backend-dev push-backend-dev

build-backend-dev:
	docker build -t $(BASE_IMG_NAME)-backend-dev --build-arg TARGET_ENV=dev -f Dockerfile.backend  .

push-backend-dev:
	docker tag $(BASE_IMG_NAME)-backend-dev $(REPO_IMG_DEV):$(TAG)
	docker push $(REPO_IMG_DEV)-backend-dev:$(TAG)