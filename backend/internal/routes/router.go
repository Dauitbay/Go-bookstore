package routes

import (
	"net/http"
	
	controllers2 "github.com/Dauitbay/go-bookstore/internal/controllers"
	"github.com/Dauitbay/go-bookstore/internal/interfaces"
	middleware2 "github.com/Dauitbay/go-bookstore/internal/middleware"
	"github.com/gorilla/mux"
)

func SetupRouter(
	authController *controllers2.AuthController,
	bookController *controllers2.BookController,
	authRepo interfaces.AuthRepository,
) *mux.Router {
	
	r := mux.NewRouter()
	
	r.Use(middleware2.RequestLogger)
	r.Use(middleware2.CORS)
	
	authMW := middleware2.NewAuthMiddleware(authRepo)
	
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
		return middleware2.RequireAuthUnlessPublic(next, authMW, public)
	})
	
	RegisterAuthRoutes(r, authController, authMW)
	
	RegisterBookRoutes(r, bookController, authMW)
	
	// FRONTEND
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./frontend")))
	
	return r
}
