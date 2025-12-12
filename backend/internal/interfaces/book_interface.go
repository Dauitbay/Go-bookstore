package interfaces

import (
	"net/http"
	
	"github.com/Dauitbay/go-bookstore/internal/dto"
	"github.com/Dauitbay/go-bookstore/internal/models"
)

type BookRepositoryInterface interface {
	Create(book *models.Book) error
	GetAll() ([]models.Book, error)
	List(page, limit int) ([]models.Book, int64, error) // ← Paginated
	GetById(id uint) (*models.Book, error)
	Update(book *models.Book) error
	Delete(id uint) error
}

type BookServiceInterface interface {
	Create(req dto.BookRequest) (*dto.BookResponse, error)
	List(page, limit int) (*dto.PaginatedResponse[dto.BookResponse], error)
	GetAll() ([]dto.BookResponse, error)
	GetById(id uint) (*dto.BookResponse, error)
	Update(id uint, req dto.BookRequest) (*dto.BookResponse, error)
	Delete(id uint) error
}

type BookControllerInterface interface {
	GetAll(w http.ResponseWriter, r *http.Request)
	List(w http.ResponseWriter, r *http.Request)
	GetById(w http.ResponseWriter, r *http.Request)
	Create(w http.ResponseWriter, r *http.Request)
	Update(w http.ResponseWriter, r *http.Request)
	Delete(w http.ResponseWriter, r *http.Request)
}
