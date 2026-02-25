"use client"
import React from "react"
import { Box, Typography, CircularProgress } from "@mui/material"
import { Droppable } from "@hello-pangea/dnd"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

const Column = ({ id, title, color, count, onAddClick, children, onLoadMore, hasMore, isLoadingMore }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore) {
      onLoadMore()
    }
  }, [inView, hasMore, isLoadingMore, onLoadMore])

  return (
    <Box 
      sx={{ 
        flex: 1, 
        minWidth: 320, 
        backgroundColor: "#F3F4F6", 
        borderRadius: 4, 
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "80vh", 
        boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1, px: 0.5 }}>
        <Box 
          sx={{ 
            width: 8, 
            height: 8, 
            borderRadius: "50%", 
            backgroundColor: color 
          }} 
        />
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontWeight: 700, 
            letterSpacing: 1, 
            color: "#4B5563",
            fontSize: "0.7rem"
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: "#9CA3AF", 
            fontWeight: 600,
            backgroundColor: "#E5E7EB",
            px: 1,
            borderRadius: 10,
            fontSize: "0.65rem"
          }}
        >
          {count}
        </Typography>
      </Box>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Box 
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: 1.5,
              flexGrow: 1,
              overflowY: "auto", 
              overflowX: "hidden",
              px: 0.5,
              transition: "background-color 0.2s ease",
              backgroundColor: snapshot.isDraggingOver ? "rgba(37, 99, 235, 0.05)" : "transparent",
              borderRadius: 2,
              "::-webkit-scrollbar": {
                width: "6px",
              },
              "::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "::-webkit-scrollbar-thumb": {
                background: "#D1D5DB",
                borderRadius: "10px",
              },
              "::-webkit-scrollbar-thumb:hover": {
                background: "#9CA3AF",
              }
            }}
          >
            {children}
            {provided.placeholder}
            
            <Box ref={ref} sx={{ height: 20, display: "flex", justifyContent: "center", py: 1 }}>
              {isLoadingMore && <CircularProgress size={20} />}
            </Box>
          </Box>
        )}
      </Droppable>

      <Box 
        onClick={onAddClick}
        sx={{ 
          mt: 2, 
          border: "1px dashed #E5E7EB", 
          borderRadius: 2, 
          p: 1.5, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: "transparent",
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: "#E5E7EB"
          }
        }}
      >
        <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 600 }}>
          + Add task
        </Typography>
      </Box>
    </Box>
  )
}

export default Column