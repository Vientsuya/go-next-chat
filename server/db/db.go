package db

import "database/sql"

type Database struct {
	db *sql.DB
}

func NewDatabase() (*Database, error) {
	sql.Open("postgres", "postgresql://" + )

}
