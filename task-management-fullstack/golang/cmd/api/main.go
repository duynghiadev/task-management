package main

import (
	"log"
	"task_management/internal/config"
	"task_management/internal/handler"
	"task_management/pkg/middleware"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Initialize database
	db, err := config.InitDB()
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	// Initialize router
	r := gin.Default()

	// Apply middleware
	r.Use(middleware.CORS())

	// Initialize handlers
	taskHandler := handler.NewTaskHandler(db)

	// Routes
	r.GET("/tasks", taskHandler.GetTasks)
	r.GET("/tasks/:id", taskHandler.GetTask)
	r.POST("/tasks", taskHandler.CreateTask)
	r.PATCH("/tasks/:id", taskHandler.UpdateTask)
	r.DELETE("/tasks/:id", taskHandler.DeleteTask)

	r.Run(":8080")
}
