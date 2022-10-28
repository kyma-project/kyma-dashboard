BASE_IMG_NAME=kyma-dashboard
DEV_IMG_NAME=$(BASE_IMG_NAME)-dev
REPO_IMG_DEV = $(DOCKER_PUSH_REPOSITORY)$(DOCKER_PUSH_DIRECTORY)/$(DEV_IMG_NAME)
TAG = $(DOCKER_TAG)

release-dev: build-dev push-dev

build-dev:
	docker build -t $(DEV_IMG_NAME) --build-arg TARGET_ENV=dev -f Dockerfile.web  .

push-dev:
	docker tag $(DEV_IMG_NAME) $(REPO_IMG_DEV):$(TAG)
	docker push $(REPO_IMG_DEV):$(TAG)
