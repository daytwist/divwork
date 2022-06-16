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
