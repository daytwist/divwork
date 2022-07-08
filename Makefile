# development
build:
	docker-compose -f docker-compose.dev.yml up -d --build

up:
	docker-compose -f docker-compose.dev.yml up -d

start:
	docker-compose -f docker-compose.dev.yml start

stop:
	docker-compose -f docker-compose.dev.yml stop

restart:
	docker-compose -f docker-compose.dev.yml restart

front:
	docker-compose -f docker-compose.dev.yml exec frontend ash

back:
	docker-compose -f docker-compose.dev.yml exec backend bash

# production
build-prod:
	docker-compose -f docker-compose.prod.yml up -d --build

up-prod:
	docker-compose -f docker-compose.prod.yml up -d

start-prod:
	docker-compose -f docker-compose.prod.yml start

stop-prod:
	docker-compose -f docker-compose.prod.yml stop

restart-prod:
	docker-compose -f docker-compose.prod.yml restart

front-prod:
	docker-compose -f docker-compose.prod.yml exec frontend ash

back-prod:
	docker-compose -f docker-compose.prod.yml exec backend bash
