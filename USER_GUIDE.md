# Movie Countdown 2026 - User Guide

A web application that displays upcoming movies for 2026 with live countdown timers showing exactly how long until each movie releases.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Features](#features)
- [Using the Application](#using-the-application)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before running this application, make sure you have the following installed on your system:

| Software | Version | Download Link |
|----------|---------|---------------|
| Node.js | 18.x or higher | https://nodejs.org/ |
| npm | 9.x or higher | Comes with Node.js |

To check if you have these installed, open a terminal and run:

```bash
node --version
npm --version
```

## Quick Start

### Step 1: Clone or Download the Project

If you have the project as a zip file, extract it to your desired location.

### Step 2: Install Dependencies

Open a terminal and navigate to the project folder. You need to install dependencies for both the server and client.

**Install server dependencies:**
```bash
cd server
npm install
```

**Install client dependencies:**
```bash
cd ../client
npm install
```

### Step 3: Start the Application

You need to run two servers - the backend API server and the frontend development server.

**Terminal 1 - Start the Backend Server:**
```bash
cd server
npm start
```
You should see: `Server running on http://localhost:3001`

**Terminal 2 - Start the Frontend Server:**
```bash
cd client
npm run dev
```
You should see: `VITE ready` with `Local: http://localhost:5173/`

### Step 4: Open the Application

Open your web browser and navigate to:

```
http://localhost:5173/
```

## Features

### 1. Movie Grid Display
- Browse through upcoming 2026 movies displayed in a responsive grid layout
- Each movie card shows:
  - Movie initials as a visual identifier
  - Movie title
  - Genre tags (up to 2 genres displayed)
  - Gradient background for visual appeal

### 2. Search Functionality
- Use the search bar at the top to filter movies by title
- Search is case-insensitive (searching "spider" will find "Spider-Man")
- Results update in real-time as you type

### 3. Countdown Timer
- Click on any movie card to open the countdown modal
- See a live countdown showing:
  - Days remaining
  - Hours remaining
  - Minutes remaining
  - Seconds remaining (updates every second)
- View full movie details including:
  - Release date
  - Director
  - Cast members
  - Full description
  - All genres

### 4. Smart Filtering
- Movies that have already been released are automatically hidden
- Only upcoming movies with future release dates are displayed

## Using the Application

### Browsing Movies

1. Open the application in your browser
2. Scroll through the movie grid to browse available movies
3. Movies are displayed in a responsive grid that adjusts based on your screen size:
   - Desktop (large screens): 4 movies per row
   - Tablet: 3 movies per row
   - Mobile: 2 movies per row
   - Small mobile: 1 movie per row

### Searching for Movies

1. Click on the search box in the header
2. Type the movie name you're looking for
3. The grid will automatically filter to show matching movies
4. Clear the search box to see all movies again

### Viewing Movie Countdown

1. Click on any movie card
2. A modal will open showing:
   - Large countdown timer at the top
   - Movie details below
3. Watch the countdown update in real-time
4. Click the "X" button or click outside the modal to close it

## Troubleshooting

### "Failed to fetch movies" Error

**Problem:** The frontend can't connect to the backend API.

**Solution:**
1. Make sure the backend server is running on port 3001
2. Check Terminal 1 for any error messages
3. Try restarting the backend server:
   ```bash
   cd server
   npm start
   ```

### Port Already in Use

**Problem:** Error message says port 3001 or 5173 is already in use.

**Solution:**
1. Find and stop the process using that port:
   ```bash
   # For Linux/Mac
   lsof -ti:3001 | xargs kill -9

   # For Windows
   netstat -ano | findstr :3001
   taskkill /PID <PID_NUMBER> /F
   ```
2. Restart the server

### Movies Not Loading

**Problem:** The page shows "Loading movies..." indefinitely.

**Solution:**
1. Check if the backend server is running
2. Open browser developer tools (F12) and check the Console tab for errors
3. Make sure you're accessing `http://localhost:5173/` (not https)

### Blank Page

**Problem:** The page loads but shows nothing.

**Solution:**
1. Open browser developer tools (F12)
2. Check the Console tab for JavaScript errors
3. Try clearing your browser cache and refreshing

## Stopping the Application

To stop the application:

1. Go to Terminal 1 (backend) and press `Ctrl + C`
2. Go to Terminal 2 (frontend) and press `Ctrl + C`

## Browser Support

This application works best on modern browsers:

- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari

## Need Help?

If you encounter any issues not covered in this guide:

1. Check the terminal windows for error messages
2. Make sure all dependencies are installed correctly
3. Try deleting `node_modules` folders and reinstalling:
   ```bash
   # In server directory
   rm -rf node_modules && npm install

   # In client directory
   rm -rf node_modules && npm install
   ```
