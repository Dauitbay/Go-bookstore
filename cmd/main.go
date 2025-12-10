package main

import (
	"log"
	"net/http"
	
	"github.com/Dauitbay/go-bookstore/internal/config"
	"github.com/Dauitbay/go-bookstore/internal/controllers"
	"github.com/Dauitbay/go-bookstore/internal/repository"
	"github.com/Dauitbay/go-bookstore/internal/routes"
	"github.com/Dauitbay/go-bookstore/internal/services"
)

func main() {
	config.Load()
	cfg := config.Get()
	
	// Connect DB
	db, err := config.ConnectAndMigrate(cfg.DB.DSN)
	if err != nil {
		log.Fatal("DB error:", err)
	}
	
	// Dependencies
	authRepo := repository.NewAuthRepository(db)
	authService := services.NewAuthService(authRepo)
	authController := controllers.NewAuthController(authService)
	
	bookRepo := repository.NewBookRepository(db)
	bookService := services.NewBookService(bookRepo)
	bookController := controllers.NewBookController(bookService)
	
	// Router
	r := routes.SetupRouter(authController, bookController, authRepo)
	
	log.Println("Server running on port:", cfg.App.Port)
	log.Fatal(http.ListenAndServe(":"+cfg.App.Port, r))
}
