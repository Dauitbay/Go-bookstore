package middleware

import (
	"context"
	"net/http"
	
	"github.com/Dauitbay/go-bookstore/internal/interfaces"
	"github.com/Dauitbay/go-bookstore/internal/models"
	"github.com/Dauitbay/go-bookstore/internal/utils"
)

type AuthMiddleware struct {
	repo interfaces.AuthRepository
}

func NewAuthMiddleware(repo interfaces.AuthRepository) *AuthMiddleware {
	return &AuthMiddleware{repo: repo}
}

type ctxKey string

const userCtxKey ctxKey = "currentUser"

func (m *AuthMiddleware) RequireAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("Authorization")
		if auth == "" {
			utils.JSONError(w, http.StatusUnauthorized, "missing token")
			return
		}
		
		token := auth[len("Bearer "):]
		claims, err := utils.ValidateAccessToken(token)
		if err != nil {
			utils.JSONError(w, http.StatusUnauthorized, "invalid token")
			return
		}
		
		uid := utils.ParseUint(claims.Subject)
		user, err := m.repo.GetUserByID(uid)
		if err != nil {
			utils.JSONError(w, http.StatusUnauthorized, "user not found")
			return
		}
		
		ctx := context.WithValue(r.Context(), userCtxKey, user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func CurrentUser(r *http.Request) *models.User {
	val, ok := r.Context().Value(userCtxKey).(*models.User)
	if !ok {
		return nil
	}
	return val
}
