.PHONY: up down logs build shell clean dev dev-down dev-logs

up:
	docker compose up --build -d

down:
	docker compose down

logs:
	docker compose logs -f web

build:
	docker compose build

shell:
	docker compose exec web sh

clean:
	docker compose down --rmi local --volumes --remove-orphans

dev:
	docker compose -f docker-compose.dev.yml up --build

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-logs:
	docker compose -f docker-compose.dev.yml logs -f web
