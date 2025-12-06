package config

import (
	"log"
	"os"
	
	"github.com/joho/godotenv"
)

type Env struct {
	AppEnv  string
	AppPort string
	
	DatabaseDSN string
}

func LoadEnv() *Env {
	// Load .env only in local mode
	if os.Getenv("APP_ENV") == "local" {
		if err := godotenv.Load(); err != nil {
			log.Println(".env file not found, continuing without it")
		}
	}
	
	env := &Env{
		AppEnv:      getEnv("APP_ENV", "local"),
		AppPort:     getEnv("APP_PORT", "9010"),
		DatabaseDSN: getEnv("DATABASE_DSN", ""),
	}
	
	if env.DatabaseDSN == "" {
		log.Fatal("DATABASE_DSN is required")
	}
	
	return env
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
