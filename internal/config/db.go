package config

import (
	"log"
	
	"github.com/Dauitbay/go-bookstore/internal/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func ConnectAndMigrate(dsn string) (*gorm.DB, error) {
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	
	// AutoMigrate all DB models
	err = db.AutoMigrate(
		&models.User{},
		&models.Book{},
		&models.RefreshToken{},
	)
	if err != nil {
		return nil, err
	}
	
	log.Println("Database connected and migrated successfully")
	return db, nil
}
