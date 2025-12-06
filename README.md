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

Supports Docker, Makefile-based workflow, CI/CD with GitHub Actions, and MySQL via GORM.

---

## Features

- Clean Go project structure (`cmd` + `internal`)
- CRUD operations for Book entity
- GORM ORM with MySQL driver
- Dependency injection (Repository → Service → Controller)
- SQL migrations using `golang-migrate`
- Dockerfile (multi-stage build)
- Makefile for dev workflows
- GitHub Actions CI/CD pipeline
- Environment variable configuration (`.env`)
- Follows REST best practices

---

## Technologies

- Go 1.22+
- GORM v2
- MySQL
- Gorilla Mux Router
- Docker / Docker Compose
- golang-migrate
- GitHub Actions

---

## Project Structure

