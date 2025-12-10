package routes

import (
	"github.com/Dauitbay/go-bookstore/internal/controllers"
	"github.com/Dauitbay/go-bookstore/internal/middleware"
	"github.com/gorilla/mux"
)

func RegisterAuthRoutes(r *mux.Router, controller *controllers.AuthController, authMW *middleware.AuthMiddleware) {
	
	// PUBLIC AUTH ROUTES
	r.HandleFunc("/auth/register", controller.Register).Methods("POST")
	r.HandleFunc("/auth/login", controller.Login).Methods("POST")
	r.HandleFunc("/auth/refresh", controller.Refresh).Methods("POST")
	
	// PROTECTED AUTH ROUTES
	protected := r.NewRoute().Subrouter()
	protected.Use(authMW.RequireAuth)
	
	protected.HandleFunc("/auth/me", controller.Me).Methods("GET")
	protected.HandleFunc("/auth/logout", controller.Logout).Methods("POST")
	protected.HandleFunc("/auth/logout-all", controller.LogoutAll).Methods("POST")
}
