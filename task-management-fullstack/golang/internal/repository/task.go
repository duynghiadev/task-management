package repository

import (
	"task_management/internal/model"

	"gorm.io/gorm"
)

type TaskRepository struct {
	db *gorm.DB
}

func NewTaskRepository(db *gorm.DB) *TaskRepository {
	return &TaskRepository{db: db}
}

func (r *TaskRepository) FindAll() ([]model.Task, error) {
	var tasks []model.Task
	result := r.db.Find(&tasks)
	return tasks, result.Error
}

func (r *TaskRepository) FindByID(id string) (model.Task, error) {
	var task model.Task
	err := r.db.First(&task, id).Error
	return task, err
}

func (r *TaskRepository) Create(task *model.Task) error {
	return r.db.Create(task).Error
}

func (r *TaskRepository) Update(task *model.Task) error {
	return r.db.Save(task).Error
}

func (r *TaskRepository) Delete(task *model.Task) error {
	return r.db.Delete(task).Error
}
