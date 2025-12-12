# Go Bookstore Microservice

A clean, production-ready microservice written in Go, implementing a CRUD API for managing books.  
The project follows a real microservice architecture with proper separation of layers:

- `cmd/` – service entrypoint
- `internal/config` – env & database configuration
- `internal/models` – domain models
- `internal/repository` – DB queries using GORM
- `internal/services` – business logic
- `internal/controllers` – HTTP handlers
- `internal/routes` – routing setup
- `migrate/` – SQL database migrations

Supports Docker, Makefile-based workflow and MySQL via GORM.

---

## Features

- Clean Go project structure (`cmd` + `internal`)
- CRUD operations for Book entity
- GORM ORM with MySQL driver
- Dependency injection (Repository → Service → Controller)
- SQL migrations using `golang-migrate`
- Dockerfile (multi-stage build)
- Makefile for dev workflows
- Environment variable configuration (`.env`)
- Follows REST best practices

---

### Technologies

- Go 1.22+
- GORM v2
- MySQL
- golang-migrate

### Request Flow

HTTP Request

↓

Controller (validate & read DTO)

↓

Service (business logic)

↓

Repository (database)

↓

Transformer (model → dto)

↓

Controller (HTTP JSON response)


<img width="1494" height="893" alt="image" src="https://github.com/user-attachments/assets/30069134-ca9d-4c63-9f45-8b18361430f8" />

<img width="1505" height="883" alt="image" src="https://github.com/user-attachments/assets/b7aa3d11-fa62-40d0-b75b-d4ec2e4d5a59" />

