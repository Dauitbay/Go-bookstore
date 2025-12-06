package bookservice

import (
	"log"
	"net/http"
	
	"github.com/gorilla/mux"
	
	"github.com/Dauitbay/go-bookstore/internal/config"
	"github.com/Dauitbay/go-bookstore/internal/controllers"
	"github.com/Dauitbay/go-bookstore/internal/models"
	"github.com/Dauitbay/go-bookstore/internal/repository"
	"github.com/Dauitbay/go-bookstore/internal/routes"
	"github.com/Dauitbay/go-bookstore/internal/services"
)

func main() {
	env := config.LoadEnv()
	
	db, err := config.ConnectDB(env.DatabaseDSN)
	if err != nil {
		log.Fatal(err)
	}
	
	db.AutoMigrate(&models.Book{})
	
	// Dependency injection
	bookRepo := repository.NewBookRepository(db)
	bookService := services.NewBookService(bookRepo)
	bookController := controllers.NewBookController(bookService)
	
	// Router
	router := mux.NewRouter()
	routes.RegisterBookRoutes(router, bookController)
	
	log.Println("Server running on port", env.AppPort)
	log.Fatal(http.ListenAndServe(":"+env.AppPort, router))
}
