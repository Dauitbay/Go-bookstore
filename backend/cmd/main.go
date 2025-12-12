package main

import (
	"log"
	"net/http"
	
	config2 "github.com/Dauitbay/go-bookstore/internal/config"
	controllers2 "github.com/Dauitbay/go-bookstore/internal/controllers"
	repository2 "github.com/Dauitbay/go-bookstore/internal/repository"
	"github.com/Dauitbay/go-bookstore/internal/routes"
	services2 "github.com/Dauitbay/go-bookstore/internal/services"
)

func main() {
	config2.Load()
	cfg := config2.Get()
	
	// Connect DB
	db, err := config2.ConnectAndMigrate(cfg.DB.DSN)
	if err != nil {
		log.Fatal("DB error:", err)
	}
	
	// Dependencies
	authRepo := repository2.NewAuthRepository(db)
	authService := services2.NewAuthService(authRepo)
	authController := controllers2.NewAuthController(authService)
	
	bookRepo := repository2.NewBookRepository(db)
	bookService := services2.NewBookService(bookRepo)
	bookController := controllers2.NewBookController(bookService)
	
	// Router
	r := routes.SetupRouter(authController, bookController, authRepo)
	
	log.Println("Server running on port:", cfg.App.Port)
	log.Fatal(http.ListenAndServe(":"+cfg.App.Port, r))
}
