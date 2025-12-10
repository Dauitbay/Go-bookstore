package controllers

import (
	"encoding/json"
	"net/http"
	
	"github.com/Dauitbay/go-bookstore/internal/dto"
	"github.com/Dauitbay/go-bookstore/internal/models"
	"github.com/Dauitbay/go-bookstore/internal/services"
	"github.com/Dauitbay/go-bookstore/internal/transformers"
	"github.com/Dauitbay/go-bookstore/internal/utils"
)

type BookController struct {
	service *services.BookService
}

func NewBookController(service *services.BookService) *BookController {
	return &BookController{service: service}
}

func (c *BookController) GetAll(w http.ResponseWriter, r *http.Request) {
	books, err := c.service.GetAll()
	if err != nil {
		utils.JSONError(w, http.StatusInternalServerError, "database error")
		return
	}
	
	responses := make([]dto.BookResponse, 0, len(books))
	for _, b := range books {
		responses = append(responses, transformers.BookToResponse(&b))
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responses)
}

func (c *BookController) GetById(w http.ResponseWriter, r *http.Request) {
	id, err := utils.ParseUintParam(w, r, "bookId")
	if err != nil {
		return
	}
	
	book, err := c.service.GetById(id)
	if err != nil {
		utils.JSONError(w, http.StatusNotFound, "book not found")
		return
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transformers.BookToResponse(book))
}

func (c *BookController) Create(w http.ResponseWriter, r *http.Request) {
	var req dto.BookRequest
	
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONError(w, http.StatusBadRequest, "invalid JSON")
		return
	}
	
	book := models.Book{
		Name:        req.Name,
		Author:      req.Author,
		Publication: req.Publication,
	}
	
	if err := c.service.Create(&book); err != nil {
		utils.JSONError(w, http.StatusInternalServerError, "failed to create book")
		return
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transformers.BookToResponse(&book))
}

func (c *BookController) Update(w http.ResponseWriter, r *http.Request) {
	id, err := utils.ParseUintParam(w, r, "bookId")
	if err != nil {
		return
	}
	
	existing, err := c.service.GetById(id)
	if err != nil {
		utils.JSONError(w, http.StatusNotFound, "book not found")
		return
	}
	
	var req dto.BookRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONError(w, http.StatusBadRequest, "invalid JSON")
		return
	}
	
	// Update fields only if provided
	if req.Name != "" {
		existing.Name = req.Name
	}
	if req.Author != "" {
		existing.Author = req.Author
	}
	if req.Publication != "" {
		existing.Publication = req.Publication
	}
	
	if err := c.service.Update(existing); err != nil {
		utils.JSONError(w, http.StatusInternalServerError, "failed to update book")
		return
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transformers.BookToResponse(existing))
}

func (c *BookController) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := utils.ParseUintParam(w, r, "bookId")
	if err != nil {
		return
	}
	
	if err := c.service.Delete(id); err != nil {
		utils.JSONError(w, http.StatusInternalServerError, "failed to delete book")
		return
	}
	
	w.WriteHeader(http.StatusNoContent)
}
