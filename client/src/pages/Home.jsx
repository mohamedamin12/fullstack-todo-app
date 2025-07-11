import React, { useEffect, useState, useMemo } from "react";
import {
  Typography,
  CircularProgress,
  Stack,
  ButtonGroup,
  Button,
} from "@mui/material";
import { fetchTasks } from "../services/api";
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
    <div>
      <Typography variant="h5" gutterBottom>
        قائمة المهام
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

      {loading ? (
        <CircularProgress />
      ) : filteredTasks.length === 0 ? (
        <Typography color="text.secondary">
          لا توجد مهام{" "}
          {filter === "completed"
            ? "مكتملة"
            : filter === "pending"
            ? "غير مكتملة"
            : "حالياً"}
          .
        </Typography>
      ) : (
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
      )}
    </div>
  );
};

export default Home;
