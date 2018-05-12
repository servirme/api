.PHONY: dev prod test lint down clean

# PROD
prod: setupdb-prod api-prod

api-prod:
	@docker-compose up -d api-prod

setupdb-prod: database-prod migrate-prod seed-prod

database-prod:
	@docker-compose up -d postgres-prod
	@sleep 3

migrate-prod:
	@docker-compose run --rm api-prod npm run migrate

seed-prod:
	@docker-compose run --rm api-prod npm run seed

# Development
dev: setupdb-dev api-dev

api-dev:
	@docker-compose up -d api

setupdb-dev: database-dev migrate-dev seed-dev

database-dev:
	@docker-compose up -d postgres
	@sleep 3

migrate-dev:
	@docker-compose run --rm api npm run migrate

seed-dev:
	@docker-compose run --rm api npm run seed

# Test
test:
	@docker-compose exec api env NODE_ENV=test npm test

lint:
	@docker-compose exec api npm run lint

send-coverage-data:
	@docker-compose exec api npm run send-coverage-data

# Docker related commands
down:
	@docker-compose stop
	@docker-compose rm -v -f

clean:
	@docker-compose down -v --rmi local --remove-orphans
