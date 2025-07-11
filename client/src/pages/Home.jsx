import React, { useEffect, useState , useMemo  } from "react";
import { Typography, CircularProgress, Stack, ButtonGroup, Button } from "@mui/material";
import { fetchTasks } from "../services/api";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTask()
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
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
    <div>
      <Typography variant="h5" gutterBottom>
        قائمة المهام
      </Typography>

      
      <AddTaskForm onTaskAdded={handleTaskAdded} />

      <Stack direction="row" spacing={2} mb={3}>
      <ButtonGroup variant="outlined">
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "contained" : "outlined"}
        >
          الكل
        </Button>
        <Button
          onClick={() => setFilter("pending")}
          variant={filter === "pending" ? "contained" : "outlined"}
        >
          غير مكتملة
        </Button>
        <Button
          onClick={() => setFilter("completed")}
          variant={filter === "completed" ? "contained" : "outlined"}
        >
          مكتملة
        </Button>
      </ButtonGroup>
    </Stack>

      {
        loading ? (
          <CircularProgress />
        ) : tasks.length === 0 ? (
          <Typography color="text.secondary">لا توجد مهام حالياً</Typography>
        ) : (
          <Stack spacing={2}>
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onTaskUpdated={handleTaskUpdated}   onTaskDeleted={handleTaskDeleted}/>
            ))}
          </Stack>
        )
      }
    </div>
  )
}

export default Home
