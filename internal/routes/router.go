package routes

import (
	"net/http"
	
	"github.com/gorilla/mux"
	
	"github.com/Dauitbay/go-bookstore/internal/controllers"
	"github.com/Dauitbay/go-bookstore/internal/interfaces"
	"github.com/Dauitbay/go-bookstore/internal/middleware"
)

func SetupRouter(
	authController *controllers.AuthController,
	bookController *controllers.BookController,
	authRepo interfaces.AuthRepository,
) *mux.Router {
	
	r := mux.NewRouter()
	
	r.Use(middleware.RequestLogger)
	r.Use(middleware.CORS)
	
	authMW := middleware.NewAuthMiddleware(authRepo)
	
	public := []string{
		"/",
		"/index.html",
		
		"/auth/login",
		"/auth/register",
		"/auth/refresh",
		
		"/login.html",
		"/register.html",
		
		"/assets/",
		"/static/",
		"/favicon.ico",
		"/header.html",
		"/footer.html",
	}
	
	r.Use(func(next http.Handler) http.Handler {
		return middleware.RequireAuthUnlessPublic(next, authMW, public)
	})
	
	RegisterAuthRoutes(r, authController, authMW)
	
	RegisterBookRoutes(r, bookController, authMW)
	
	// FRONTEND
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./frontend")))
	
	return r
}
