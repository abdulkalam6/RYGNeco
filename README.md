
# TaskFlow - Personal Task Tracker 📋

A beautiful, responsive personal task tracker built with React.js that helps you manage your daily tasks efficiently. Features a clean interface with smooth animations and persistent data storage.


## ✨ Features

### 🔐 Simple Authentication
- Basic login form with username storage
- User session persistence with localStorage
- Personalized welcome message

### 📋 Complete Task Management
- ✅ Add tasks with title and optional description
- ✏️ Edit tasks inline with smooth transitions
- 🗑️ Delete tasks with confirmation dialog
- ✔️ Mark tasks as completed/pending with visual feedback
- 📅 Automatic creation date/time tracking

### 🎨 Beautiful User Interface
- 🌈 Modern gradient design with smooth animations
- 📱 Fully responsive (mobile + desktop optimized)
- 🎭 Different visual styles for completed vs pending tasks
- ⚡ Hover effects and micro-interactions
- 🎯 Clean, intuitive user experience

### 🔍 Advanced Filtering & Search
- 📊 Filter tabs: "All", "Completed", "Pending"
- 🔢 Task count badges for each filter
- 🔎 Real-time search across task titles and descriptions
- 📈 Dynamic task statistics

### 💾 Data Persistence
- 💿 All tasks stored in localStorage
- 🔄 Data persists across browser sessions
- 📦 Sample tasks included for new users
- 🛡️ Error handling for storage operations

## 🚀 Live Demo

[View Live Demo](https://your-demo-url.netlify.app) *(Deploy to get URL)*

## 📁 Project Structure

```
src/
├── components/
│   ├── Login.tsx           # User authentication
│   ├── TaskDashboard.tsx   # Main dashboard container
│   ├── TaskForm.tsx        # Add/edit task form
│   ├── TaskItem.tsx        # Individual task display
│   ├── TaskFilter.tsx      # Filtering and search
│   └── TaskList.tsx        # Task collection display
├── types/
│   └── task.ts            # TypeScript interfaces
├── utils/
│   └── localStorage.ts    # Data persistence utilities
└── pages/
    └── Index.tsx          # Main application entry
```

## 🛠️ Technologies Used

- **React 18** - Modern React with Hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **Lucide React** - Consistent icon set
- **Vite** - Fast development build tool

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

## 🎯 Usage Guide

### Getting Started
1. Enter any username on the login screen
2. Click "Start Tracking Tasks" to access the dashboard

### Managing Tasks
- **Add Task**: Click the "Add Task" button and fill in the form
- **Complete Task**: Click the circle icon next to any task
- **Edit Task**: Click the edit icon to modify task details
- **Delete Task**: Click the trash icon and confirm deletion

### Organization
- Use the filter tabs to view different task categories
- Search for specific tasks using the search bar
- View task counts in the filter badges

