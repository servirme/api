default: setupdb api

api: database
	@docker-compose up -d api
	@sleep 3

setupdb: database migrate seed

database:
	@docker-compose up -d database
	@sleep 3

migrate: api database
	@docker-compose run api scripts/database/migrate

seed: migrate
	@docker-compose run api scripts/database/seed

test: api
	@docker-compose run api scripts/code/test

lint: api
	@docker-compose run api scripts/code/lint

send-coverage-data: api
	@docker-compose run api scripts/code/send-coverage-data

down:
	@docker-compose stop
	@docker-compose rm -v -f

clean:
	@docker-compose down -v --rmi local --remove-orphans
