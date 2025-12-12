package repository

import (
	"github.com/Dauitbay/go-bookstore/internal/models"
	"gorm.io/gorm"
)

type BookRepository struct {
	db *gorm.DB
}

func NewBookRepository(db *gorm.DB) *BookRepository {
	return &BookRepository{db: db}
}

func (r *BookRepository) Create(book *models.Book) error {
	return r.db.Create(book).Error
}

func (r *BookRepository) GetAll() ([]models.Book, error) {
	var books []models.Book
	err := r.db.Find(&books).Error
	return books, err
}

func (r *BookRepository) List(page, limit int) ([]models.Book, int64, error) {
	var books []models.Book
	var total int64
	
	// Count total records
	if err := r.db.Model(&models.Book{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}
	
	offset := (page - 1) * limit
	
	// Apply pagination
	if err := r.db.Limit(limit).Offset(offset).Order("id DESC").Find(&books).Error; err != nil {
		return nil, 0, err
	}
	
	return books, total, nil
}

func (r *BookRepository) GetById(id uint) (*models.Book, error) {
	var book models.Book
	if err := r.db.First(&book, id).Error; err != nil {
		return nil, err
	}
	return &book, nil
}

func (r *BookRepository) Update(book *models.Book) error {
	return r.db.Save(book).Error
}

func (r *BookRepository) Delete(id uint) error {
	return r.db.Delete(&models.Book{}, id).Error
}
