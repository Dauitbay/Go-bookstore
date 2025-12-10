package models

import (
	"time"
	
	"gorm.io/gorm"
)

type RefreshToken struct {
	gorm.Model
	Token     string `gorm:"type:varchar(512);uniqueIndex"`
	UserID    uint   `gorm:"index"`
	ExpiresAt time.Time
}
