package repository

import (
	"errors"
	
	"github.com/Dauitbay/go-bookstore/internal/interfaces"
	"github.com/Dauitbay/go-bookstore/internal/models"
	"gorm.io/gorm"
)

type AuthRepository struct {
	db *gorm.DB
}

func NewAuthRepository(db *gorm.DB) interfaces.AuthRepository {
	return &AuthRepository{db: db}
}

func (r *AuthRepository) CreateUser(u *models.User) error {
	return r.db.Create(u).Error
}

func (r *AuthRepository) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email = ?", email).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	return &user, err
}

func (r *AuthRepository) GetUserByID(id uint) (*models.User, error) {
	var user models.User
	err := r.db.First(&user, id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	return &user, err
}

func (r *AuthRepository) SaveRefreshToken(rt *models.RefreshToken) error {
	_ = r.DeleteRefreshToken(rt.Token)
	return r.db.Create(rt).Error
}

func (r *AuthRepository) GetRefreshToken(token string) (*models.RefreshToken, error) {
	var rt models.RefreshToken
	err := r.db.Where("token = ?", token).First(&rt).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	return &rt, err
}

func (r *AuthRepository) DeleteRefreshToken(token string) error {
	return r.db.Where("token = ?", token).Delete(&models.RefreshToken{}).Error
}

func (r *AuthRepository) DeleteRefreshTokensByUser(userID uint) error {
	return r.db.Where("user_id = ?", userID).Delete(&models.RefreshToken{}).Error
}
