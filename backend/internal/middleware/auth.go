package middleware

import (
	"context"
	"net/http"
	
	"github.com/Dauitbay/go-bookstore/internal/interfaces"
	"github.com/Dauitbay/go-bookstore/internal/models"
	utils2 "github.com/Dauitbay/go-bookstore/internal/utils"
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
			utils2.JSONError(w, http.StatusUnauthorized, "missing token")
			return
		}
		
		token := auth[len("Bearer "):]
		claims, err := utils2.ValidateAccessToken(token)
		if err != nil {
			utils2.JSONError(w, http.StatusUnauthorized, "invalid token")
			return
		}
		
		uid := utils2.ParseUint(claims.Subject)
		user, err := m.repo.GetUserByID(uid)
		if err != nil {
			utils2.JSONError(w, http.StatusUnauthorized, "user not found")
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
