"use client"
import React from "react"
import { Paper, Typography, Box, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteTask } from "../hooks/useTasks";
import { Draggable } from "@hello-pangea/dnd";

const priorityColors = {
  high: { bg: "#FEE2E2", text: "#EF4444" },
  medium: { bg: "#FFEDD5", text: "#F59E0B" },
  low: { bg: "#F3F4F6", text: "#6B7280" }
}

const TaskCard = ({ task, index, onEdit }) => {
  const priority = task.priority?.toLowerCase() || "low";
  const colors = priorityColors[priority];
  const { mutate: deleteTask } = useDeleteTask();
  
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTask(task.id);
    setConfirmOpen(false);
  };

  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided, snapshot) => (
          <Paper 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            elevation={0}
            onClick={onEdit}
            sx={{ 
              p: 2.5, 
              borderRadius: 3, 
              backgroundColor: "#FFFFFF",
              border: snapshot.isDragging ? "2px solid #2563EB" : "1px solid #E5E7EB",
              cursor: "pointer",
              transition: "transform 0.1s ease-in-out, box-shadow 0.1s",
              boxShadow: snapshot.isDragging ? "0 10px 15px -3px rgb(0 0 0 / 0.1)" : "none",
              "&:hover": {
                transform: snapshot.isDragging ? "none" : "translateY(-2px)",
                boxShadow: snapshot.isDragging ? "0 10px 15px -3px rgb(0 0 0 / 0.1)" : "0 4px 6px -1px rgb(0 0 0 / 0.1)"
              }
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 700, 
                  color: "#1F2937", 
                  fontSize: "0.95rem"
                }}
              >
                {task.title}
              </Typography>
              <IconButton 
                onClick={handleDeleteClick} 
                size="small"
                sx={{ color: "#9CA3AF", "&:hover": { color: "#EF4444" }, mt: -0.5, mr: -1 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography 
              variant="body2" 
              sx={{ 
                color: "#6B7280", 
                mb: 2,
                lineHeight: 1.5,
                fontSize: "0.85rem"
              }}
            >
              {task.description}
            </Typography>
            
            <Chip 
              label={priority.toUpperCase()} 
              size="small"
              sx={{ 
                backgroundColor: colors.bg, 
                color: colors.text,
                fontWeight: 700,
                fontSize: "0.65rem",
                height: 20,
                borderRadius: 1
              }}
            />
          </Paper>
        )}
      </Draggable>

      {/* Delete Confirmation */}
      <Dialog 
        open={confirmOpen} 
        onClose={() => setConfirmOpen(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmOpen(false)} sx={{ color: "#6B7280" }}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error" sx={{ fontWeight: 700 }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TaskCard