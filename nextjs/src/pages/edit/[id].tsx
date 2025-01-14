import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import TaskForm from "../../components/TaskForm";

const API_URL = "http://localhost:8080";

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks/${id}`);
      setTask(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching task:", error);
      setError("Không thể tải thông tin công việc. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-600 mb-4">Không tìm thấy công việc</div>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return <TaskForm initialData={task} taskId={Number(id)} isEdit />;
}
