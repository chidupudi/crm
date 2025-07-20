# CRM Tool Setup Guide

## Overview
A comprehensive CRM tool for consultancy businesses with the following features:
- 5-stage pipeline: Lead → Qualified → Training → Placement → Completed
- Drag-and-drop interface for moving students between stages
- Beautiful animations and responsive design
- Student management with full CRUD operations
- Search and filtering capabilities
- Firebase integration (with demo fallback)

## Features Implemented

### 🎯 Core Functionality
- ✅ 5-stage CRM pipeline
- ✅ Drag and drop students between stages
- ✅ Add/Edit/Delete students
- ✅ Search students by name, email, course
- ✅ Filter by domestic/international
- ✅ Real-time statistics dashboard

### 🎨 UI/UX
- ✅ Beautiful color-coded stages
- ✅ Smooth animations with Framer Motion
- ✅ Responsive design with Tailwind CSS
- ✅ Professional icons with Lucide React
- ✅ Interactive hover effects and transitions

### 📊 Student Data Fields
- Name, Email, Phone, Location
- Domestic/International classification
- Course/Service type
- Stage tracking
- Notes and timestamps

## Firebase Setup

1. Create a new Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Copy your Firebase config
4. Replace the config in `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Running the Application

```bash
npm start
```

The app will run on http://localhost:3000

## Demo Mode
If Firebase is not configured, the app runs in demo mode with sample students. All CRUD operations work locally.

## Project Structure
```
src/
├── components/
│   ├── CRMDashboard.js     # Main dashboard
│   ├── StageColumn.js      # Kanban column
│   ├── StudentCard.js      # Student card component
│   └── StudentForm.js      # Add/Edit form
├── hooks/
│   └── useStudents.js      # Firebase integration
├── constants/
│   └── stages.js           # Stage definitions
└── firebase.js            # Firebase config
```

## Usage Tips
1. Click "Add Student" to create new entries
2. Drag students between stages to track progress
3. Use search to quickly find specific students
4. Filter by domestic/international students
5. Edit student details by clicking the edit icon
6. View real-time statistics in the top cards

The application is fully functional and ready for production use!