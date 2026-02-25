# Kanban Board Application

A robust, interactive Kanban board built with Next.js and React. Manage your tasks seamlessly with dynamic drag-and-drop functionality, infinite scrolling, and real-time search.

## Features

- **Drag and Drop Interface:** Intuitively move tasks between columns (Backlog, In Progress, Review, Done) using `@hello-pangea/dnd`.
- **Infinite Scrolling:** Each column supports localized infinite scrolling, seamlessly loading tasks on demand for optimal performance.
- **Global Search:** Instantly filter tasks by title or description using a powerful search bar powered by Zustand.
- **Task Management:** Create, edit, and delete tasks with ease. Includes safe-delete confirmation dialogs to prevent accidental loss.
- **Optimistic Updates:** The UI updates instantly upon interaction, eliminating flickers while syncing with the server in the background.
- **Beautiful UI:** Styled with Material UI for a polished, modern, and responsive layout.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **UI Architecture:** [React](https://reactjs.org/)
- **Design System:** [Material UI (MUI)](https://mui.com/)
- **State Management:** 
  - Server State: [TanStack Query (React Query)](https://tanstack.com/query)
  - Client State: [Zustand](https://github.com/pmndrs/zustand)
- **Drag & Drop Engine:** [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **Data Fetching:** [Axios](https://axios-http.com/)
- **Infinite Scrolling:** [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)
- **Mock Backend API:** [json-server](https://github.com/typicode/json-server)

---

## Setup Instructions

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/RaniaAtef/todo-list.git
cd todo-list
```

### 2. Install Dependencies

Install the required packages using npm:

```bash
npm install
```

### 3. Start the Mock Database Server

The application relies on `json-server` to mock a live REST API database. You need to run this server to fetch, update, and manage tasks. 

Open a terminal window and run:

```bash
npx json-server --watch db.json --port 4000
```

*(Note: The mock server must run specifically on port `4000` to connect properly with the frontend.)*

### 4. Start the Frontend Application

Open a **second, separate terminal window** in the project directory and start the Next.js development server:

```bash
npm run dev
```

### 5. Open the App in your Browser
Visit [http://localhost:3000](http://localhost:3000) in your browser to view and use the Kanban board!
