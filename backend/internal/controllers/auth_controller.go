package controllers

import (
	"encoding/json"
	"net/http"
	
	"github.com/Dauitbay/go-bookstore/internal/dto"
	"github.com/Dauitbay/go-bookstore/internal/middleware"
	"github.com/Dauitbay/go-bookstore/internal/services"
	"github.com/Dauitbay/go-bookstore/internal/transformers"
	"github.com/Dauitbay/go-bookstore/internal/utils"
)

type AuthController struct {
	service *services.AuthService
}

func NewAuthController(s *services.AuthService) *AuthController {
	return &AuthController{service: s}
}

func (c *AuthController) Register(w http.ResponseWriter, r *http.Request) {
	var req dto.RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONError(w, http.StatusBadRequest, "invalid json")
		return
	}
	
	user, access, refresh, exp, err := c.service.Register(req.Email, req.Password, req.Name)
	if err != nil {
		utils.JSONError(w, http.StatusBadRequest, err.Error())
		return
	}
	
	resp := dto.AuthResponse{
		User: transformers.UserToResponse(user),
		Token: &dto.TokenResponse{
			AccessToken:  access,
			RefreshToken: refresh,
			ExpiresAt:    exp,
		},
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func (c *AuthController) Login(w http.ResponseWriter, r *http.Request) {
	var req dto.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONError(w, http.StatusBadRequest, "invalid json")
		return
	}
	
	user, access, refresh, exp, err := c.service.Login(req.Email, req.Password)
	if err != nil {
		utils.JSONError(w, http.StatusUnauthorized, "invalid credentials")
		return
	}
	
	resp := dto.AuthResponse{
		User: transformers.UserToResponse(user),
		Token: &dto.TokenResponse{
			AccessToken:  access,
			RefreshToken: refresh,
			ExpiresAt:    exp,
		},
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func (c *AuthController) Refresh(w http.ResponseWriter, r *http.Request) {
	var req dto.RefreshRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONError(w, http.StatusBadRequest, "invalid json")
		return
	}
	
	access, refresh, exp, err := c.service.Refresh(req.RefreshToken)
	if err != nil {
		utils.JSONError(w, http.StatusUnauthorized, "invalid refresh token")
		return
	}
	
	resp := map[string]dto.TokenResponse{
		"token": {
			AccessToken:  access,
			RefreshToken: refresh,
			ExpiresAt:    exp,
		},
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func (c *AuthController) Logout(w http.ResponseWriter, r *http.Request) {
	var req dto.RefreshRequest
	_ = json.NewDecoder(r.Body).Decode(&req)
	_ = c.service.Logout(req.RefreshToken)
	w.WriteHeader(http.StatusOK)
}

func (c *AuthController) LogoutAll(w http.ResponseWriter, r *http.Request) {
	user := middleware.CurrentUser(r)
	if user == nil {
		utils.JSONError(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	
	_ = c.service.LogoutAll(user.ID)
	w.WriteHeader(http.StatusOK)
}

func (c *AuthController) Me(w http.ResponseWriter, r *http.Request) {
	user := middleware.CurrentUser(r)
	if user == nil {
		utils.JSONError(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transformers.UserToResponse(user))
}
