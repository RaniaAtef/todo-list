"use client"
import React from "react"
import { TextField, InputAdornment } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useTaskStore } from "../store/taskStore"

const SearchBar = () => {
  const { search, setSearch } = useTaskStore()

  return (
    <TextField
      placeholder="Search tasks..."
      variant="outlined"
      size="small"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "#9CA3AF" }} />
          </InputAdornment>
        )
      }}
      sx={{
        backgroundColor: "#FFFFFF",
        minWidth: "250px",
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        }
      }}
    />
  )
}

export default SearchBar
