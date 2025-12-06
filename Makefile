APP_NAME=bookservice
CMD_DIR=./cmd/bookservice

build:
	@echo "Building..."
	go build -o $(APP_NAME) $(CMD_DIR)

run:
	@echo "Running..."
	go run $(CMD_DIR)

docker-build:
	@echo "Building docker image..."
	docker build -t $(APP_NAME):latest .

docker-run:
	@echo "Running docker container..."
	docker run -p 9010:9010 --env-file .env $(APP_NAME):latest

test:
	@echo "Testing..."
	go test ./... -cover

migrate-create:
	@read -p "Name: " name; \
	migrate create -ext sql -dir migrate -seq $$name

migrate-up:
	migrate -path migrate -database "$(DATABASE_DSN)" up

migrate-down:
	migrate -path migrate -database "$(DATABASE_DSN)" down

clean:
	rm -f $(APP_NAME)
