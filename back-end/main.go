package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Task struct {
	ID          uint   `json:"id" gorm:"primaryKey;autoIncrement"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	CreatedAt   string `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   string `json:"updated_at" gorm:"autoUpdateTime"`
}

var db *gorm.DB

func main() {
	godotenv.Load(".env")

	dsn := os.Getenv("DB")

	var err error
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&Task{})

	r := gin.Default()

	r.GET("/tasks", GetTasks)
	r.POST("/tasks", CreateTask)
	r.PATCH("/tasks/:id", UpdateTask)
	r.DELETE("/tasks/:id", DeleteTask)

	r.Run()
}

func GetTasks(c *gin.Context) {
	var tasks []Task
	db.Find(&tasks)
	c.JSON(200, tasks)
}

func CreateTask(c *gin.Context) {
	var task Task
	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	db.Create(&task)
	c.JSON(200, task)
}

func UpdateTask(c *gin.Context) {
	id := c.Param("id")
	var task Task
	if err := db.First(&task, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "Task not found"})
		return
	}
	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	db.Save(&task)
	c.JSON(200, task)
}

func DeleteTask(c *gin.Context) {
	id := c.Param("id")
	if err := db.Delete(&Task{}, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "Task not found"})
		return
	}
	c.JSON(200, gin.H{"message": "Task deleted"})
}
