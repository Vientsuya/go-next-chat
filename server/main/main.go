package main

import (
	_ "github.com/lib/pq"
	"log"
	"server/db"
)

func main() {
	config, err := db.LoadConfig(".")
	if err != nil {
		log.Fatal("Couldn't read config", err)
	}

	_, err = db.NewDatabase(config)
	if err != nil {
		log.Fatal("Couldn't connect to the database", err)
	}
}
