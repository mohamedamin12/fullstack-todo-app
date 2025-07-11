import {
  Typography,
  CircularProgress,
  Stack,
  ButtonGroup,
  Button,
  Box,
} from "@mui/material";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import { useTaskContext } from "../contexts/TaskContext";


const Home = () => {
  const {
    filteredTasks,
    filter,
    setFilter,
    loading,
    addTask,
    updateTaskHandler,
    deleteTaskHandler,
  } = useTaskContext();

  return (
    <div style={{ direction: "ltr" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#1976d2",
          textShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        📋 قائمة المهام
      </Typography>

      <AddTaskForm onTaskAdded={addTask} />

      <Stack direction="row" spacing={2} mb={3}>
        <ButtonGroup variant="outlined">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "contained" : "outlined"}
          >
            الكل
          </Button>
          <Button
            onClick={() => setFilter("completed")}
            variant={filter === "completed" ? "contained" : "outlined"}
          >
            مكتملة
          </Button>
          <Button
            onClick={() => setFilter("pending")}
            variant={filter === "pending" ? "contained" : "outlined"}
          >
            غير مكتملة
          </Button>
        </ButtonGroup>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : filteredTasks.length === 0 ? (
        <Typography color="text.secondary">
          لا توجد مهام
          {filter === "completed"
            ? "مكتملة"
            : filter === "pending"
              ? "غير مكتملة"
              : "حالياً"}
          .
        </Typography>
      ) : (
        <Box
          sx={{
            maxHeight: "400px",
            overflowY: "auto",
            pr: 1, // padding right علشان شكل الـ scrollbar
          }}
        >
          <Stack spacing={2}>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onTaskUpdated={updateTaskHandler}
                onTaskDeleted={deleteTaskHandler}
              />
            ))}
          </Stack>
        </Box>

      )}
    </div>
  );
};

export default Home;
