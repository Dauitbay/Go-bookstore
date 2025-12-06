package routes

import (
	"github.com/Dauitbay/go-bookstore/internal/controllers"
	"github.com/gorilla/mux"
)

func RegisterBookRoutes(router *mux.Router, controller *controllers.BookController) {
	router.HandleFunc("/book", controller.Create).Methods("POST")
	router.HandleFunc("/book", controller.GetAll).Methods("GET")
	router.HandleFunc("/book/{bookId}", controller.GetById).Methods("GET")
	router.HandleFunc("/book/{bookId}", controller.Update).Methods("PUT")
	router.HandleFunc("/book/{bookId}", controller.Delete).Methods("DELETE")
}
