build:
	docker-compose build

up:
	docker-compose up -d

start:
	docker-compose start

stop:
	docker-compose stop

restart:
	docker-compose restart

front:
	docker-compose exec frontend bash

back:
	docker-compose exec backend bash
