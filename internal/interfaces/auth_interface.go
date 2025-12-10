package interfaces

import (
	"net/http"
	
	"github.com/Dauitbay/go-bookstore/internal/models"
)

type AuthRepository interface {
	CreateUser(u *models.User) error
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id uint) (*models.User, error)
	
	SaveRefreshToken(rt *models.RefreshToken) error
	GetRefreshToken(token string) (*models.RefreshToken, error)
	DeleteRefreshToken(token string) error
	DeleteRefreshTokensByUser(userID uint) error
}

type AuthService interface {
	Register(email, password, name string) (*models.User, string, string, int64, error)
	Login(email, password string) (*models.User, string, string, int64, error)
	Refresh(refreshToken string) (string, string, int64, error)
	Logout(refreshToken string) error
	LogoutAll(userID uint) error
}

type AuthController interface {
	Register(w http.ResponseWriter, r *http.Request)
	Login(w http.ResponseWriter, r *http.Request)
	Refresh(w http.ResponseWriter, r *http.Request)
	Logout(w http.ResponseWriter, r *http.Request)
	LogoutAll(w http.ResponseWriter, r *http.Request)
}
