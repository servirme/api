default: setupdb api

api: setupdb
	@docker-compose up -d api
	@sleep 3

api-logs:
	@docker-compose logs --tail=0 -f api

setupdb: database migrate seed

database:
	@docker-compose up -d database
	@sleep 3

migrate:
	@docker-compose run api scripts/database/migrate

seed:
	@docker-compose run api scripts/database/seed

test: setupdb
	@docker-compose run api scripts/code/test

lint:
	@docker-compose run api scripts/code/lint

send-coverage-data:
	@docker-compose run api scripts/code/send-coverage-data

down:
	@docker-compose stop
	@docker-compose rm -v -f

clean:
	@docker-compose down -v --rmi local --remove-orphans
