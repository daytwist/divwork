build:
	docker-compose build

up:
	docker-compose up -d

start:
	COMPOSE_HTTP_TIMEOUT=100 docker-compose start

stop:
	COMPOSE_HTTP_TIMEOUT=100 docker-compose stop

restart:
	docker-compose restart

front:
	docker-compose exec frontend bash

back:
	docker-compose exec backend bash

down:
	docker-compose down
