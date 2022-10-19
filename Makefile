build:
	docker-compose up -d --build

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

db:
	docker-compose exec backend bundle exec rails db:create db:migrate db:seed

down:
	docker-compose down -v
