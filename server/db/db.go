package db

import (
	"database/sql"
	"log"
)

type Database struct {
	db *sql.DB
}

func NewDatabase(config *Config) (*Database, error) {
	db, err := sql.Open("postgres", "postgresql://"+
		config.DBUserName+
		":"+
		config.DBUserPassword+
		"@"+
		config.DBHost+
		":"+
		config.DBPort+
		"/"+
		config.DBName+
		"?sslmode=disable")

	log.Println("postgresql://" +
		config.DBUserName +
		":" +
		config.DBUserPassword +
		"@" +
		config.DBHost +
		":" +
		config.DBPort +
		"/" +
		config.DBName +
		"?sslmode=disable")

	if err != nil {
		return nil, err
	}

	return &Database{db: db}, nil
}

func (d *Database) Close() {
	err := d.db.Close()

	if err != nil {
		log.Fatal("Couldn't close the db")
	}
}

func (d *Database) GetDB() *sql.DB {
	return d.db
}
