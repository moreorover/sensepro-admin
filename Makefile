.PHONY: build-local
build-local: ## Build the local docker image.
	docker compose -f docker/local/docker-compose.yaml build

.PHONY: start-local
start-local: ## Start the local docker container.
	docker compose -f docker/local/docker-compose.yaml up -d

.PHONY: stop-local
stop-local: ## Stop the local docker container.
	docker compose -f docker/local/docker-compose.yaml down
