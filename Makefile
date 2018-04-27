prod:
	@docker-compose up -d api-prod

default: setupdb api

api: setupdb
	@docker-compose up -d api

api-logs:
	@docker-compose logs --tail=0 -f api

setupdb: database migrate seed

database:
	@docker-compose up -d postgres
	@sleep 3

migrate:
	@docker-compose run --rm api npm run migrate

seed:
	@docker-compose run --rm api npm run seed

test:
	@docker-compose exec api env NODE_ENV=test npm test

lint:
	@docker-compose exec api npm run lint

send-coverage-data:
	@docker-compose exec api npm run send-coverage-data

down:
	@docker-compose stop
	@docker-compose rm -v -f

clean:
	@docker-compose down -v --rmi local --remove-orphans

.PHONY: api api setupdb database migrate seed test lint send down clean
