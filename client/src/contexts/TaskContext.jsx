import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/api";
import { toast } from "react-toastify";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);

        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }

        const { data } = await fetchTasks();
        setTasks(data);

        localStorage.setItem("tasks", JSON.stringify(data));

      } catch (error) {
        console.error("Error fetching tasks:", error);
      }

      setLoading(false);

    };
    loadTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  

  const addTask = async (taskData) => {
    try {
      const { data } = await createTask(taskData);
      setTasks((prev) => [data, ...prev]);
      toast.success("✅ تم إضافة المهمة بنجاح!");
    } catch (error) {
      toast.error("❌ فشل في إضافة المهمة!");
    }
  };

  const updateTaskHandler = async (id, updatedData) => {
    try {
      const { data } = await updateTask(id, updatedData);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? data : task))
      );
      toast.success("✏️ تم تعديل المهمة بنجاح!");
    } catch (error) {
      toast.error("❌ فشل في تعديل المهمة!");
    }
  };

  const deleteTaskHandler = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("🗑️ تم حذف المهمة بنجاح.");
    } catch (error) {
      toast.error("❌ فشل في حذف المهمة!");
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.isCompleted);
    } else if (filter === "pending") {
      return tasks.filter((task) => !task.isCompleted);
    }
    return tasks;
  }, [tasks, filter]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        filter,
        setFilter,
        loading,
        addTask,
        updateTaskHandler,
        deleteTaskHandler,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
