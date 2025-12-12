package utils

import (
	"encoding/json"
	"net/http"
	"strconv"
	
	"github.com/gorilla/mux"
)

func JSONError(w http.ResponseWriter, code int, msg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": false,
		"error":   msg,
	})
}

// ParseUint safely converts string → uint
func ParseUint(s string) uint {
	v, err := strconv.ParseUint(s, 10, 64)
	if err != nil {
		return 0
	}
	return uint(v)
}

func ParseUintParam(w http.ResponseWriter, r *http.Request, param string) (uint, error) {
	vars := mux.Vars(r)
	idStr := vars[param]
	
	id64, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		JSONError(w, http.StatusBadRequest, "invalid "+param)
		return 0, err
	}
	
	return uint(id64), nil
}
