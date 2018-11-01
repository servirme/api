.PHONY: dev prod test lint down clean

# Production
prod: setupdb-prod redis-prod api-prod

api-prod:
	@docker-compose -f docker-compose.prod.yml up -d api

redis-prod:
	@docker-compose -f docker-compose.prod.yml up -d redis

setupdb-prod: database-prod migrate-prod seed-prod

database-prod:
	@docker-compose -f docker-compose.prod.yml up -d postgres
	@sleep 3

migrate-prod:
	@docker-compose -f docker-compose.prod.yml run --rm api npm run migrate

seed-prod:
	@docker-compose -f docker-compose.prod.yml run --rm api npm run seed

# Certificates
generate-cert:
	@docker run --rm \
		-p 80:80 \
		-p 443:443 \
		-v $(shell pwd)/letsencrypt:/etc/letsencrypt \
		certbot/certbot \
		certonly -d api.servir.me --standalone -m matheusvellone@hotmail.com --agree-tos

generate-test-cert:
	@docker run --rm \
		-p 80:80 \
		-p 443:443 \
		-v $(shell pwd)/letsencrypt:/etc/letsencrypt \
		certbot/certbot \
		certonly -d api.servir.me --standalone -m matheusvellone@hotmail.com --agree-tos \
		--staging

renew-cert:
	@docker run --rm \
		-p 80:80 \
		-p 443:443 \
		-v $(shell pwd)/letsencrypt:/etc/letsencrypt \
		certbot/certbot \
		renew

renew-test-cert:
	@docker run --rm \
		-p 80:80 \
		-p 443:443 \
		-v $(shell pwd)/letsencrypt:/etc/letsencrypt \
		certbot/certbot \
		renew \
		--staging

# Deploy
restart: pull pm2-restart

pull:
	@git pull origin master

pm2-restart:
	@docker-compose -f docker-compose.prod.yml exec api npm run pm2-restart

# Development
dev: setupdb-dev redis-dev api-dev

api-dev:
	@docker-compose up -d api

redis-dev:
	@docker-compose up -d redis

setupdb-dev: database-dev migrate-dev seed-dev

database-dev:
	@docker-compose up -d postgres
	@sleep 3

migrate-dev:
	@docker-compose run --rm api npm run migrate

seed-dev:
	@docker-compose run --rm api npm run seed

# Test
test: test-unit test-e2e

test-e2e:
	@docker-compose exec api env NODE_ENV=test npm run test-e2e

test-unit: api-dev
	@docker-compose exec api env NODE_ENV=test npm run test-unit

test-unit-watch: api-dev
	@docker-compose exec api env NODE_ENV=test npm run test-unit-watch

lint:
	@docker-compose exec api npm run lint

send-coverage-data:
	@docker-compose exec api npm run send-coverage-data

# Docker related commands
down:
	@docker-compose down

clean:
	@docker-compose down -v --rmi local --remove-orphans
