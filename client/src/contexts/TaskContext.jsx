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
        const { data } = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } 
        
      setLoading(false);
      
    };
    loadTasks();
  }, []);

  const addTask = async (taskData) => {
    const { data } = await createTask(taskData);
    setTasks((prev) => [data, ...prev]);
  };

  const updateTaskHandler = async (id, updatedData) => {
    const { data } = await updateTask(id, updatedData);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? data : task))
    );
  };

  const deleteTaskHandler = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
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
