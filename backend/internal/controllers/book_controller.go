package controllers

import (
	"encoding/json"
	"net/http"
	
	"github.com/Dauitbay/go-bookstore/internal/dto"
	"github.com/Dauitbay/go-bookstore/internal/services"
	"github.com/Dauitbay/go-bookstore/internal/utils"
)

type BookController struct {
	service services.BookService
}

func NewBookController(service services.BookService) *BookController {
	return &BookController{service: service}
}

func (c *BookController) List(w http.ResponseWriter, r *http.Request) {
	books, err := c.service.List()
	if err != nil {
		utils.JSONError(w, 500, "failed to fetch books")
		return
	}
	json.NewEncoder(w).Encode(books)
}

func (c *BookController) GetAll(w http.ResponseWriter, r *http.Request) {
	books, err := c.service.GetAll()
	if err != nil {
		utils.JSONError(w, 500, "failed to fetch books")
		return
	}
	json.NewEncoder(w).Encode(books)
}

func (c *BookController) GetById(w http.ResponseWriter, r *http.Request) {
	id, err := utils.ParseUintParam(w, r, "id")
	if err != nil {
		return
	}
	book, err := c.service.GetById(id)
	if err != nil {
		utils.JSONError(w, 404, "not found")
		return
	}
	json.NewEncoder(w).Encode(book)
}

func (c *BookController) Create(w http.ResponseWriter, r *http.Request) {
	var req dto.BookRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONError(w, 400, "invalid JSON")
		return
	}
	
	book, err := c.service.Create(req)
	if err != nil {
		utils.JSONError(w, 500, "failed to create")
		return
	}
	
	json.NewEncoder(w).Encode(book)
}

func (c *BookController) Update(w http.ResponseWriter, r *http.Request) {
	id, err := utils.ParseUintParam(w, r, "id")
	if err != nil {
		return
	}
	
	var req dto.BookRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONError(w, 400, "invalid JSON")
		return
	}
	
	book, err := c.service.Update(id, req)
	if err != nil {
		utils.JSONError(w, 500, "failed to update")
		return
	}
	
	json.NewEncoder(w).Encode(book)
}

func (c *BookController) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := utils.ParseUintParam(w, r, "id")
	if err != nil {
		return
	}
	
	if err := c.service.Delete(id); err != nil {
		utils.JSONError(w, 500, "failed to delete")
		return
	}
	
	w.WriteHeader(204)
}
