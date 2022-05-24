up:
	docker-compose up -d

restart:
	docker-compose restart

stop:
	docker-compose stop

front:
	docker-compose exec frontend ash

back:
	docker-compose exec backend bash
