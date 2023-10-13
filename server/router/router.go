package router

import (
	"github.com/gin-gonic/gin"
	"server/internal/user"
	"server/internal/ws"
)

var router *gin.Engine

func InitRouter(userHandler *user.Handler, wsHandler *ws.Handler) {
	router = gin.Default()

	router.POST("/signup", userHandler.CreateUser)
	router.POST("/login", userHandler.Login)
	router.GET("/logout", userHandler.Logout)

	router.POST("/ws/createRoom", wsHandler.CreateRoom)
	router.GET("/ws/joinRoom/:roomId", wsHandler.JoinRoom)
	router.GET("/ws/getRooms", wsHandler.GetRooms)
	router.GET("/ws/getClients/:roomId", wsHandler.GetClients)
}

func Start(addr string) error {
	return router.Run(addr)
}
