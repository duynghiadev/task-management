// components/TaskForm.tsx
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

interface TaskFormData {
  title: string;
  description: string;
  status: string;
}

interface TaskFormProps {
  initialData?: TaskFormData;
  taskId?: number;
  isEdit?: boolean;
}

const API_URL = "http://localhost:8080";

export default function TaskForm({
  initialData,
  taskId,
  isEdit = false,
}: TaskFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: initialData,
  });

  const onSubmit = async (data: TaskFormData) => {
    try {
      if (isEdit) {
        await axios.patch(`${API_URL}/tasks/${taskId}`, data);
      } else {
        await axios.post(`${API_URL}/tasks`, data);
      }
      router.push("/");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Task" : "Create New Task"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="block mb-2">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full p-2 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEdit ? "Update Task" : "Create Task"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
