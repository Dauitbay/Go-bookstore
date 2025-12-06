package services

import (
	"github.com/Dauitbay/go-bookstore/internal/models"
	"github.com/Dauitbay/go-bookstore/internal/repository"
)

type BookService struct {
	repo *repository.BookRepository
}

func NewBookService(repo *repository.BookRepository) *BookService {
	return &BookService{repo: repo}
}

func (s *BookService) Create(book *models.Book) error {
	return s.repo.Create(book)
}

func (s *BookService) GetAll() ([]models.Book, error) {
	return s.repo.GetAll()
}

func (s *BookService) GetById(id uint) (*models.Book, error) {
	return s.repo.GetById(id)
}

func (s *BookService) Update(book *models.Book) error {
	return s.repo.Update(book)
}

func (s *BookService) Delete(id uint) error {
	return s.repo.Delete(id)
}
