package transformers

import (
	"github.com/Dauitbay/go-bookstore/internal/dto"
	"github.com/Dauitbay/go-bookstore/internal/models"
)

func BookToResponse(m *models.Book) dto.BookResponse {
	return dto.BookResponse{
		ID:          m.ID,
		Name:        m.Name,
		Author:      m.Author,
		Publication: m.Publication,
	}
}
