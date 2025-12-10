package routes

import (
	"github.com/Dauitbay/go-bookstore/internal/middleware"
	"github.com/gorilla/mux"
	
	"github.com/Dauitbay/go-bookstore/internal/controllers"
)

func RegisterBookRoutes(r *mux.Router, controller *controllers.BookController, authMW *middleware.AuthMiddleware) {
	
	// Public
	r.HandleFunc("/book", controller.GetAll).Methods("GET")
	r.HandleFunc("/book/{id}", controller.GetById).Methods("GET")
	
	// Protected
	protected := r.NewRoute().Subrouter()
	protected.Use(authMW.RequireAuth)
	
	protected.HandleFunc("/book", controller.Create).Methods("POST")
	protected.HandleFunc("/book/{id}", controller.Update).Methods("PUT")
	protected.HandleFunc("/book/{id}", controller.Delete).Methods("DELETE")
}
