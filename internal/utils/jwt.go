package utils

import (
	"errors"
	"strconv"
	"time"
	
	"github.com/Dauitbay/go-bookstore/internal/config"
	"github.com/golang-jwt/jwt/v5"
)

// -----------------------------------------------------------------------------
// TOKEN GENERATION (Access + Refresh)
// -----------------------------------------------------------------------------

func GenerateTokens(userID uint) (string, string, time.Time, error) {
	cfg := config.Get()
	
	accessExpMin := cfg.Auth.AccessExpiresMin
	refreshDays := cfg.Auth.RefreshExpiresDays
	secret := cfg.Auth.JWTSecret
	refreshSecret := cfg.Auth.RefreshSecret
	
	// -------------------------------------------------------------------------
	// ACCESS TOKEN
	// -------------------------------------------------------------------------
	accessClaims := jwt.RegisteredClaims{
		Subject:   strconv.FormatUint(uint64(userID), 10),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Duration(accessExpMin) * time.Minute)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
	}
	
	access, err := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims).
		SignedString([]byte(secret))
	if err != nil {
		return "", "", time.Time{}, err
	}
	
	// -------------------------------------------------------------------------
	// REFRESH TOKEN
	// -------------------------------------------------------------------------
	refreshExpiry := time.Now().Add(time.Hour * 24 * time.Duration(refreshDays))
	
	refreshClaims := jwt.RegisteredClaims{
		Subject:   strconv.FormatUint(uint64(userID), 10),
		ExpiresAt: jwt.NewNumericDate(refreshExpiry),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
	}
	
	refresh, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).
		SignedString([]byte(refreshSecret))
	if err != nil {
		return "", "", time.Time{}, err
	}
	
	return access, refresh, refreshExpiry, nil
}

// -----------------------------------------------------------------------------
// VALIDATION HELPERS
// -----------------------------------------------------------------------------

func ValidateAccessToken(tokenStr string) (*jwt.RegisteredClaims, error) {
	secret := config.Get().Auth.JWTSecret
	return validateToken(tokenStr, secret)
}

func ValidateRefreshToken(tokenStr string) (*jwt.RegisteredClaims, error) {
	cfg := config.Get()
	secret := cfg.Auth.RefreshSecret
	if secret == "" {
		secret = cfg.Auth.JWTSecret
	}
	return validateToken(tokenStr, secret)
}

// Shared token validation logic
func validateToken(tokenStr, secret string) (*jwt.RegisteredClaims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &jwt.RegisteredClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	
	if err != nil {
		return nil, err
	}
	
	if claims, ok := token.Claims.(*jwt.RegisteredClaims); ok && token.Valid {
		return claims, nil
	}
	
	return nil, errors.New("invalid token")
}
