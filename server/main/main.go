package main

import (
	_ "github.com/lib/pq"
	"log"
	"server/db"
	"server/internal/user"
	"server/internal/ws"
	"server/router"
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

	hub := ws.NewHub()
	wsHandler := ws.NewHandler(hub)
	go hub.Run()

	router.InitRouter(userHandler, wsHandler)
	err = router.Start("0.0.0.0:8038")
	if err != nil {
		log.Fatal("Couldn't start the router")
	}
}
