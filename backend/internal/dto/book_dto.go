package dto

type BookRequest struct {
	Name        string `json:"name"`
	Author      string `json:"author"`
	Publication string `json:"publication"`
}

type BookResponse struct {
	Id          uint   `json:"id"`
	Name        string `json:"name"`
	Author      string `json:"author"`
	Publication string `json:"publication"`
}
