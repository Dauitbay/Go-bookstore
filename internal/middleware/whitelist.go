package middleware

import (
	"net/http"
	"strings"
)

func RequireAuthUnlessPublic(next http.Handler, auth *AuthMiddleware, whitelist []string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		
		path := r.URL.Path
		
		for _, open := range whitelist {
			if strings.HasSuffix(open, "/") && strings.HasPrefix(path, open) {
				next.ServeHTTP(w, r)
				return
			}
			if path == open {
				next.ServeHTTP(w, r)
				return
			}
		}
		
		auth.RequireAuth(next).ServeHTTP(w, r)
	})
}
