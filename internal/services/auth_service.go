package services

import (
	"errors"
	"strconv"
	"time"
	
	"github.com/Dauitbay/go-bookstore/internal/interfaces"
	"github.com/Dauitbay/go-bookstore/internal/models"
	"github.com/Dauitbay/go-bookstore/internal/utils"
)

type AuthService struct {
	repo interfaces.AuthRepository
}

func NewAuthService(repo interfaces.AuthRepository) *AuthService {
	return &AuthService{repo: repo}
}

func (s *AuthService) Register(email, password, name string) (*models.User, string, string, int64, error) {
	hash, err := utils.HashPassword(password)
	if err != nil {
		return nil, "", "", 0, err
	}
	
	user := &models.User{
		Email:    email,
		Password: hash,
		Name:     name,
	}
	if err := s.repo.CreateUser(user); err != nil {
		return nil, "", "", 0, err
	}
	
	access, refresh, exp, err := utils.GenerateTokens(user.ID)
	if err != nil {
		return nil, "", "", 0, err
	}
	
	rt := &models.RefreshToken{
		Token:     refresh,
		UserID:    user.ID,
		ExpiresAt: exp,
	}
	_ = s.repo.SaveRefreshToken(rt)
	
	return user, access, refresh, exp.Unix(), nil
}

func (s *AuthService) Login(email, password string) (*models.User, string, string, int64, error) {
	user, err := s.repo.GetUserByEmail(email)
	if err != nil {
		return nil, "", "", 0, err
	}
	if err := utils.CheckPassword(user.Password, password); err != nil {
		return nil, "", "", 0, err
	}
	
	access, refresh, exp, err := utils.GenerateTokens(user.ID)
	if err != nil {
		return nil, "", "", 0, err
	}
	
	rt := &models.RefreshToken{
		Token:     refresh,
		UserID:    user.ID,
		ExpiresAt: exp,
	}
	_ = s.repo.SaveRefreshToken(rt)
	
	return user, access, refresh, exp.Unix(), nil
}

func (s *AuthService) Refresh(refreshToken string) (string, string, int64, error) {
	claims, err := utils.ValidateRefreshToken(refreshToken)
	if err != nil {
		return "", "", 0, err
	}
	
	rt, err := s.repo.GetRefreshToken(refreshToken)
	if err != nil {
		return "", "", 0, err
	}
	
	uid, _ := strconv.ParseUint(claims.Subject, 10, 64)
	if rt.UserID != uint(uid) {
		return "", "", 0, errors.New("token mismatch")
	}
	
	if time.Now().After(rt.ExpiresAt) {
		_ = s.repo.DeleteRefreshToken(refreshToken)
		return "", "", 0, errors.New("refresh expired")
	}
	
	access, newRefresh, exp, err := utils.GenerateTokens(rt.UserID)
	if err != nil {
		return "", "", 0, err
	}
	
	_ = s.repo.DeleteRefreshToken(refreshToken)
	_ = s.repo.SaveRefreshToken(&models.RefreshToken{
		Token:     newRefresh,
		UserID:    rt.UserID,
		ExpiresAt: exp,
	})
	
	return access, newRefresh, exp.Unix(), nil
}

func (s *AuthService) Logout(refreshToken string) error {
	return s.repo.DeleteRefreshToken(refreshToken)
}

func (s *AuthService) LogoutAll(userID uint) error {
	return s.repo.DeleteRefreshTokensByUser(userID)
}
