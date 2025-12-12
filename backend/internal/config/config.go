package config

import (
	"log"
	"os"
	"sync"
	
	"github.com/joho/godotenv"
)

type AppConfig struct {
	Env  string
	Port string
}

type DBConfig struct {
	DSN string
}

type AuthConfig struct {
	JWTSecret          string
	RefreshSecret      string
	AccessExpiresMin   int
	RefreshExpiresDays int
}

type Config struct {
	App  AppConfig
	DB   DBConfig
	Auth AuthConfig
}

var (
	cfg  *Config
	once sync.Once
)

func Load() *Config {
	once.Do(func() {
		if os.Getenv("APP_ENV") == "" {
			_ = os.Setenv("APP_ENV", "local")
		}
		
		if os.Getenv("APP_ENV") == "local" {
			_ = godotenv.Load()
		}
		
		c := &Config{
			App: AppConfig{
				Env:  getEnv("APP_ENV", "local"),
				Port: getEnv("APP_PORT", "9010"),
			},
			DB: DBConfig{
				DSN: getEnv("DATABASE_DSN", ""),
			},
			Auth: AuthConfig{
				JWTSecret:          getEnv("JWT_SECRET", ""),
				RefreshSecret:      getEnv("REFRESH_SECRET", ""),
				AccessExpiresMin:   getEnvInt("ACCESS_TOKEN_EXPIRES_MIN", 15),
				RefreshExpiresDays: getEnvInt("REFRESH_TOKEN_EXPIRES_DAYS", 7),
			},
		}
		
		if c.DB.DSN == "" {
			log.Fatal("DATABASE_DSN is required")
		}
		
		if c.Auth.JWTSecret == "" {
			log.Println("WARNING: empty JWT_SECRET (unsafe for production)")
		}
		
		cfg = c
	})
	
	return cfg
}

func Get() *Config {
	if cfg == nil {
		log.Fatal("config.Load() must be called before config.Get()")
	}
	return cfg
}
