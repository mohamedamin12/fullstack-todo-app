import React, { useState } from "react";
import {
  Button,
  TextField,
  Stack,
  Paper,
  Typography,
} from "@mui/material";
import { createTask } from "../services/api";

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);
      const { data } = await createTask({ title, description });
      onTaskAdded(data);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("❌ فشل في إضافة المهمة:", err);
    }
  }

  return (
    <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        إضافة مهمة جديدة
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="عنوان المهمة"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="وصف المهمة"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
          >
            {loading ? "جاري الإضافة..." : "إضافة"}
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}

export default AddTaskForm
