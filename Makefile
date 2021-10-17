HASH=$(shell git rev-list HEAD -n 1 | grep a)
IMAGE_NAME="printmeat/print-me-at:$(HASH)"
INFRA_LOCAL=$(shell pwd)/infra/local.yaml

info:
	@echo "Env:"
	@echo HASH $(HASH)
	@echo IMAGE_NAME $(IMAGE_NAME)
	@echo INFRA_LOCAL $(INFRA_LOCAL)
	@echo ""

build_image: info
	docker build -t $(IMAGE_NAME) .

run_docker: build_image
	IMAGE_NAME=$(IMAGE_NAME) docker stack deploy --compose-file $(INFRA_LOCAL) printer
