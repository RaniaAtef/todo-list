"use client"
import { COLUMNS } from "./constants/columns";
import { useTasks, useUpdateTask } from "./hooks/useTasks";
import Column from "./components/Column";
import TaskCard from "./components/TaskCard";
import TaskModal from "./components/TaskModal";
import SearchBar from "./components/SearchBar";
import { useTaskStore } from "./store/taskStore";
import { Box, Typography } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { DragDropContext } from "@hello-pangea/dnd";

export default function Home() {
  const { search, setSearch } = useTaskStore()
  const { 
    data: infiniteData, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useTasks()
  const { mutate: updateTask } = useUpdateTask()
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isReady, setIsReady] = useState(false);
  
  // Flatten infinite pages into a single array - stable reference
  const serverTasks = useMemo(() => 
    infiniteData?.pages.map(page => page.data).flat() || [], 
    [infiniteData?.pages]
  );
  
  // Local state to prevent flicker during drag and drop
  const [boardTasks, setBoardTasks] = useState([]);

  // Sync server tasks to local state
  useEffect(() => {
    setBoardTasks(serverTasks);
  }, [serverTasks]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleAddTask = (columnId) => {
    setEditingTask({ column: columnId }); 
    setModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTasks = boardTasks.map(task => {
      if (task.id.toString() === draggableId) {
        return { ...task, column: destination.droppableId };
      }
      return task;
    });
  
    setBoardTasks(updatedTasks);

    const task = boardTasks.find(t => t.id.toString() === draggableId);
    if (task) {
      updateTask({ 
        id: task.id, 
        data: { ...task, column: destination.droppableId } 
      });
    }
  };

  const filteredTasks = boardTasks.filter((task) => {
    const searchTerm = search.toLowerCase();
    return (
      task?.title?.toLowerCase().includes(searchTerm) || 
      task?.description?.toLowerCase().includes(searchTerm)
    );
  });

  if (!isReady) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ 
        backgroundColor: "#F9FAFB", 
        minHeight: "100vh", 
        p: 4 
      }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 6 }}>
          <Box 
            sx={{ 
              width: 40, 
              height: 40, 
              backgroundColor: "#2563EB", 
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="1.5" fill="white"/>
              <rect x="3" y="14" width="7" height="7" rx="1.5" fill="white"/>
              <rect x="14" y="3" width="7" height="7" rx="1.5" fill="white"/>
              <rect x="14" y="14" width="7" height="7" rx="1.5" fill="white"/>
            </svg>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", lineHeight: 1.2 }}>
              KANBAN BOARD
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500 }}>
              {boardTasks.length} tasks
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <SearchBar />
        </Box>

        {/* Board Container */}
        <Box 
          sx={{ 
            display: "flex", 
            gap: 3, 
            alignItems: "flex-start",
            overflowX: "auto",
            pb: 2
          }}
        >
          {COLUMNS.map((column) => {
            const columnTasks = filteredTasks.filter((task) => task.column === column.id);
            return (
              <Column 
                key={column.id} 
                id={column.id}
                title={column.title} 
                color={column.color}
                count={columnTasks.length}
                onAddClick={() => handleAddTask(column.id)}
                onLoadMore={fetchNextPage}
                hasMore={hasNextPage}
                isLoadingMore={isFetchingNextPage}
              >
                {columnTasks.map((task, index) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    index={index}
                    onEdit={() => handleEditTask(task)}
                  />
                ))}
              </Column>
            )
          })}
        </Box>

        <TaskModal 
          open={modalOpen} 
          onClose={closeModal} 
          task={editingTask} 
        />
      </Box>
    </DragDropContext>
  );
}
