"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F9FAFB",
        gap: 2,
        zIndex: 9999,
      }}
    >
      <CircularProgress
        size={48}
        thickness={4}
        sx={{
          color: "#2563EB",
        }}
      />
      <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500 }}>
        Loading tasks…
      </Typography>
    </Box>
  );
}
