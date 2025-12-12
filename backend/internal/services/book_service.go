package services

import (
	"github.com/Dauitbay/go-bookstore/internal/dto"
	"github.com/Dauitbay/go-bookstore/internal/interfaces"
	"github.com/Dauitbay/go-bookstore/internal/models"
)

type BookService struct {
	repo interfaces.BookRepositoryInterface
}

func NewBookService(repo interfaces.BookRepositoryInterface) *BookService {
	return &BookService{repo: repo}
}

func (s *BookService) Create(req dto.BookRequest) (*dto.BookResponse, error) {
	book := models.Book{
		Name:        req.Name,
		Author:      req.Author,
		Publication: req.Publication,
	}
	
	if err := s.repo.Create(&book); err != nil {
		return nil, err
	}
	
	return &dto.BookResponse{
		Id:          book.Id,
		Name:        book.Name,
		Author:      book.Author,
		Publication: book.Publication,
	}, nil
}

func (s *BookService) GetAll() ([]dto.BookResponse, error) {
	books, err := s.repo.GetAll()
	if err != nil {
		return nil, err
	}
	
	out := make([]dto.BookResponse, 0, len(books))
	for _, b := range books {
		out = append(out, dto.BookResponse{
			Id:          b.Id,
			Name:        b.Name,
			Author:      b.Author,
			Publication: b.Publication,
		})
	}
	
	return out, nil
}

func (s *BookService) List(page, limit int) (*dto.PaginatedResponse[dto.BookResponse], error) {
	items, total, err := s.repo.List(page, limit)
	if err != nil {
		return nil, err
	}
	
	res := make([]dto.BookResponse, 0, len(items))
	for _, b := range items {
		res = append(res, dto.BookResponse{
			Id:          b.Id,
			Name:        b.Name,
			Author:      b.Author,
			Publication: b.Publication,
		})
	}
	
	return &dto.PaginatedResponse[dto.BookResponse]{
		Items: res,
		Total: total,
		Page:  page,
		Limit: limit,
	}, nil
}

func (s *BookService) GetById(id uint) (*dto.BookResponse, error) {
	book, err := s.repo.GetById(id)
	if err != nil {
		return nil, err
	}
	
	return &dto.BookResponse{
		Id:          book.Id,
		Name:        book.Name,
		Author:      book.Author,
		Publication: book.Publication,
	}, nil
}

func (s *BookService) Update(id uint, req dto.BookRequest) (*dto.BookResponse, error) {
	book, err := s.repo.GetById(id)
	if err != nil {
		return nil, err
	}
	
	book.Name = req.Name
	book.Author = req.Author
	book.Publication = req.Publication
	
	if err := s.repo.Update(book); err != nil {
		return nil, err
	}
	
	return &dto.BookResponse{
		Id:          book.Id,
		Name:        book.Name,
		Author:      book.Author,
		Publication: book.Publication,
	}, nil
}

func (s *BookService) Delete(id uint) error {
	return s.repo.Delete(id)
}
