package transformers

import (
	"github.com/Dauitbay/go-bookstore/internal/dto"
	"github.com/Dauitbay/go-bookstore/internal/models"
)

func UserToResponse(u *models.User) *dto.UserResponse {
	if u == nil {
		return nil
	}
	return &dto.UserResponse{
		ID:    u.ID,
		Email: u.Email,
		Name:  u.Name,
	}
}
