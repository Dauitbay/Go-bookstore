package interfaces

import "github.com/Dauitbay/go-bookstore/internal/models"

type BookRepository interface {
	Create(book *models.Book) error
	GetAll() ([]models.Book, error)
	GetById(id uint) (*models.Book, error)
	Update(book *models.Book) error
	Delete(id uint) error
}

type BookService interface {
	Create(book *models.Book) error
	GetAll() ([]models.Book, error)
	GetById(id uint) (*models.Book, error)
	Update(book *models.Book) error
	Delete(id uint) error
}
