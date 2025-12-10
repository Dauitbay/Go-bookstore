package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email    string `gorm:"type:varchar(255);uniqueIndex" json:"email"`
	Password string `gorm:"type:varchar(255)" json:"-"`
	Name     string `gorm:"type:varchar(255)" json:"name"`
}
