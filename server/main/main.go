package main

import (
	_ "github.com/lib/pq"
	"log"
	"server/db"
	"server/internal/user"
)

func main() {
	config, err := db.LoadConfig(".")
	if err != nil {
		log.Fatal("Couldn't read config", err)
	}

	dbConn, err := db.NewDatabase(config)
	if err != nil {
		log.Fatal("Couldn't connect to the database", err)
	}

	userRepository := user.NewRepository(dbConn.GetDB())
	userService := user.NewService(userRepository)
	userHandler := user.NewHandler(userService)

}
