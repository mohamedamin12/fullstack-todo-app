import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskCard = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const { _id, title, description, isCompleted } = task;

  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description || "");

  const handleToggleComplete = async () => {
    await onTaskUpdated(_id, { isCompleted: !isCompleted });
  };

  const handleEditSubmit = async () => {
    await onTaskUpdated(_id, {
      title: editTitle,
      description: editDesc,
    });
    setEditOpen(false);
  };

  const handleDelete = async () => {
    await onTaskDeleted(_id);
    setConfirmOpen(false);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          bgcolor: isCompleted ? "#e0f7e9" : "#fff",
          boxShadow: 2,
          transition: "0.3s",
          borderLeft: `5px solid ${isCompleted ? "#4caf50" : "#2196f3"}`,
          "&:hover": {
            transform: "scale(1.01)",
          },
        }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Checkbox checked={isCompleted} onClick={handleToggleComplete} />
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textDecoration: isCompleted ? "line-through" : "none",
                    color: isCompleted ? "gray" : "text.primary",
                    fontWeight: 600,
                  }}
                >
                  {title}
                </Typography>
                {description && (
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                )}
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <IconButton color="primary" onClick={() => setEditOpen(true)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => setConfirmOpen(true)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>هل تريد حذف المهمة "{title}"؟</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>إلغاء</Button>
          <Button onClick={handleDelete} color="error">حذف</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            label="العنوان"
            fullWidth
            margin="normal"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            label="الوصف"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>إلغاء</Button>
          <Button onClick={handleEditSubmit} variant="contained">حفظ</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskCard;
