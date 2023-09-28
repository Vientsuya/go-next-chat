# Setting up the project
## Server 

### Enabling the server
1. cd into the server directory
2. sudo docker compose up -d

Server and pgAdmin configuration should be in the app.env

The default is:

```dotenv
# POSTGRES CONTAINER POSTGRES_HOST=127.0.0.1 POSTGRES_PORT=6500
POSTGRES_USER=admin
POSTGRES_PASSWORD=password123
POSTGRES_DB=golang_chat

# PGADMIN CONTAINER
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=password123

# DATABASE CONNECTION DSN
DATABASE_URL=postgresql://admin:password123@localhost:6500/golang_chat?schema=public

CLIENT_ORIGIN=http://localhost:3000
```

### Adding server to the pgAdmin
1. use `sudo docker inspect <container-name>` (default is `postgres`)
2. Look at `NetworkSettings` and find `IPAddress` property.
3. Near the top is tcp/ip port which you also need to provide. (default is `5432`)

### Migrations
1. Create new migration using
    `create -ext <extension> <files-location> <migration-name>`  
    example: `create -ext sql db/migrations add_users_table`