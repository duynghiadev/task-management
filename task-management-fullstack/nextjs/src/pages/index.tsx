import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const API_URL = "http://localhost:8080";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTask = async (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${API_URL}/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <Link
          href="/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create New Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg">Không có task nào</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="border p-4 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2
                    className={`text-xl font-semibold ${
                      task.status === "completed"
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {task.title}
                  </h2>
                  <p
                    className={`text-gray-600 mt-2 ${
                      task.status === "completed"
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {task.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : task.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.status}
                    </span>
                    <span className="text-gray-500 text-sm">
                      Tạo ngày:{" "}
                      {new Date(task.created_at).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/edit/${task.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
