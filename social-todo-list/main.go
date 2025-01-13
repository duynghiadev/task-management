package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"social-todo-list/common"
	"social-todo-list/middleware"
	ginitem "social-todo-list/modules/item/transport/gin"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	godotenv.Load(".env.dev")

	dsn := os.Getenv("DB")
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3000"}, // Allowed origins
		AllowMethods:     []string{"GET", "POST", "PATCH", "DELETE", "OPTIONS"},      // Allowed HTTP methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},        // Allowed headers
		ExposeHeaders:    []string{"Content-Length"},                                 // Headers exposed to the client
		AllowCredentials: true,                                                       // Allow cookies and credentials
	}))

	r.Use(middleware.Recovery())

	v1 := r.Group("/v1")
	{
		items := v1.Group("/items")
		{
			items.POST("", ginitem.CreateItem(db))
			items.GET("", ginitem.ListItem(db))
			items.GET("/:id", ginitem.GetItem(db))
			items.PATCH("/:id", ginitem.UpdateItem(db))
			items.DELETE("/:id", ginitem.DeleteItem(db))
		}
	}

	r.GET("/ping", func(c *gin.Context) {
		go func() {
			defer common.Recovery()
			fmt.Println([]int{}[0])
		}()

		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.Run(":3000")
}
