"use client"
import React, { useState, useEffect } from "react"
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  MenuItem, 
  Box 
} from "@mui/material"
import { useAddTask, useUpdateTask } from "../hooks/useTasks"

const PRIORITIES = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" }
]

const TaskModal = ({ open, onClose, task }) => {
  const { mutate: addTask } = useAddTask()
  const { mutate: updateTask } = useUpdateTask()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    column: "backlog",
    priority: "low"
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        column: task.column || "backlog",
        priority: task.priority || "low"
      })
    } else {
      setFormData({
        title: "",
        description: "",
        column: "backlog",
        priority: "low"
      })
    }
    setErrors({})
  }, [task, open])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      setErrors({ title: "Title is required" })
      return
    }

    if (task?.id && task.id !== undefined && typeof task.id !== 'object') {
      updateTask({ id: task.id, data: formData }, {
        onSuccess: () => onClose()
      })
    } else {
      addTask(formData, {
        onSuccess: () => onClose()
      })
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {task?.id ? "Edit Task" : "Add New Task"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
            <TextField
              name="title"
              label="Task Title"
              fullWidth
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
            
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />

            <TextField
              name="priority"
              select
              label="Priority"
              fullWidth
              value={formData.priority}
              onChange={handleChange}
            >
              {PRIORITIES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} sx={{ color: "#6B7280", fontWeight: 600 }}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              backgroundColor: "#2563EB", 
              fontWeight: 700,
              "&:hover": { backgroundColor: "#1D4ED8" }
            }}
          >
            {task?.id ? "Update Task" : "Create Task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default TaskModal
