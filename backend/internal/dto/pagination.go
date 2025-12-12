package dto

// PaginatedResponse is a generic reusable pagination DTO.
// T should be any response type (BookResponse, UserResponse, etc.)
type PaginatedResponse[T any] struct {
	Items []T   `json:"items"`
	Total int64 `json:"total"`
	Page  int   `json:"page"`
	Limit int   `json:"limit"`
}
