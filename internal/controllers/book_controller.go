package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"
	
	"github.com/Dauitbay/go-bookstore/internal/models"
	"github.com/Dauitbay/go-bookstore/internal/services"
	"github.com/gorilla/mux"
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
		http.Error(w, "database error", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(books)
}

func (c *BookController) GetById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["bookId"]
	id, _ := strconv.ParseUint(idStr, 10, 32)
	
	book, err := c.service.GetById(uint(id))
	if err != nil {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(book)
}

func (c *BookController) Create(w http.ResponseWriter, r *http.Request) {
	var book models.Book
	
	if err := json.NewDecoder(r.Body).Decode(&book); err != nil {
		http.Error(w, "invalid JSON", http.StatusBadRequest)
		return
	}
	
	if err := c.service.Create(&book); err != nil {
		http.Error(w, "failed to create", http.StatusInternalServerError)
		return
	}
	
	json.NewEncoder(w).Encode(book)
}

func (c *BookController) Update(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["bookId"]
	id, _ := strconv.ParseUint(idStr, 10, 32)
	
	existing, err := c.service.GetById(uint(id))
	if err != nil {
		http.Error(w, "book not found", http.StatusNotFound)
		return
	}
	
	var payload models.Book
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "invalid JSON", http.StatusBadRequest)
		return
	}
	
	if payload.Name != "" {
		existing.Name = payload.Name
	}
	if payload.Author != "" {
		existing.Author = payload.Author
	}
	if payload.Publication != "" {
		existing.Publication = payload.Publication
	}
	
	if err := c.service.Update(existing); err != nil {
		http.Error(w, "failed to update", http.StatusInternalServerError)
		return
	}
	
	json.NewEncoder(w).Encode(existing)
}

func (c *BookController) Delete(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["bookId"]
	id, _ := strconv.ParseUint(idStr, 10, 32)
	
	if err := c.service.Delete(uint(id)); err != nil {
		http.Error(w, "failed to delete", http.StatusInternalServerError)
		return
	}
	
	w.WriteHeader(http.StatusNoContent)
}
