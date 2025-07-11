import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Stack,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateTask, deleteTask } from "../services/api";





const TaskCard = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const { _id, title, description, isCompleted } = task;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description || "");


  const handleToggleComplete = async () => {
    try {
      const updatedTask = {
        ...task,
        isCompleted: !isCompleted
      };
      const { data } = await updateTask(_id, { isCompleted: !isCompleted });
      onTaskUpdated(data);

    } catch (error) {
      console.error("❌ فشل في تحديث المهمة:", error);
    }
  }

  const handleEditSubmit = async () => {
    try {
      const res = await updateTask(_id, {
        title: editTitle,
        description: editDesc,
      });
      onTaskUpdated(res.data);
      setEditOpen(false);
    } catch (err) {
      console.error("❌ فشل التعديل:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(_id);
      onTaskDeleted(_id);
      setConfirmOpen(false)
    } catch (error) {
      console.error("❌ فشل في الحذف:", error);
    }
  }
  return (
    <>
      <Card variant="outlined" sx={{ bgcolor: isCompleted ? "#e0ffe0" : "#fff" }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Checkbox checked={isCompleted} onClick={handleToggleComplete} />
              <div>
                <Typography variant="subtitle1"
                  sx={{ textDecoration: isCompleted ? "line-through" : "none" }}
                >
                  {title}
                </Typography>
                {description && (
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                )}
              </div>
            </Stack>
            <Stack direction="row" spacing={1}>
              <IconButton color="primary" onClick={() => setEditOpen(true)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => setConfirmOpen(true)}>
                <DeleteIcon  />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      
      {/*Delete Dialog*/}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <DialogContentText>
            هل أنت متأكد أنك تريد حذف المهمة "<strong>{title}</strong>"؟ لا يمكن التراجع عن هذا الإجراء.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            إلغاء
          </Button>
          <Button onClick={handleDelete} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/*Edit Dialog*/}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
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
            margin="normal"
            multiline
            rows={3}
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="primary">
            إلغاء
          </Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TaskCard
