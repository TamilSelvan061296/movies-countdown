# Movie Countdown 2026 - Technical Documentation

This document explains the architecture, design decisions, and technology choices for the Movie Countdown application. It's written for developers who are new to frontend development and want to understand how modern web applications are built.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Why These Technologies?](#why-these-technologies)
4. [Project Structure](#project-structure)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [Data Flow](#data-flow)
8. [Component Design](#component-design)
9. [State Management](#state-management)
10. [Styling Approach](#styling-approach)
11. [API Design](#api-design)
12. [Key Design Decisions](#key-design-decisions)
13. [Learning Resources](#learning-resources)

---

## Architecture Overview

This application follows a **Client-Server Architecture**, which is the most common pattern for web applications.

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER'S BROWSER                                  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         FRONTEND (React + Vite)                        │  │
│  │                          http://localhost:5173                         │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐  │  │
│  │  │   Header    │  │  MovieGrid  │  │  MovieCard  │  │  Countdown   │  │  │
│  │  │ (Search Bar)│  │  (Layout)   │  │  (Display)  │  │    Modal     │  │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └──────────────┘  │  │
│  │                              │                                         │  │
│  │                              │ State Management (React useState)       │  │
│  │                              │                                         │  │
│  └──────────────────────────────┼────────────────────────────────────────┘  │
└─────────────────────────────────┼────────────────────────────────────────────┘
                                  │
                                  │ HTTP Requests (fetch API)
                                  │ GET /api/movies
                                  │ GET /api/movies/:id
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND (Express.js)                               │
│                          http://localhost:3001                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                           Express Server                               │  │
│  │  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────────┐   │  │
│  │  │  CORS Middleware │    │  Route Handlers │    │  Static Data     │   │  │
│  │  │  (Cross-Origin)  │───▶│  /api/movies    │───▶│  movies.json     │   │  │
│  │  └─────────────────┘    └─────────────────┘    └──────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Request-Response Flow

```
┌──────────┐          ┌──────────┐          ┌──────────┐          ┌──────────┐
│  User    │          │  React   │          │  Express │          │  JSON    │
│  Browser │          │  App     │          │  Server  │          │  Data    │
└────┬─────┘          └────┬─────┘          └────┬─────┘          └────┬─────┘
     │                     │                     │                     │
     │  1. Opens Page      │                     │                     │
     │────────────────────▶│                     │                     │
     │                     │                     │                     │
     │                     │  2. GET /api/movies │                     │
     │                     │────────────────────▶│                     │
     │                     │                     │                     │
     │                     │                     │  3. Read movies.json│
     │                     │                     │────────────────────▶│
     │                     │                     │                     │
     │                     │                     │  4. Return data     │
     │                     │                     │◀────────────────────│
     │                     │                     │                     │
     │                     │  5. JSON Response   │                     │
     │                     │◀────────────────────│                     │
     │                     │                     │                     │
     │  6. Render Movies   │                     │                     │
     │◀────────────────────│                     │                     │
     │                     │                     │                     │
```

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend Framework** | React | 18.2.0 | Building user interfaces with components |
| **Build Tool** | Vite | 5.0.8 | Fast development server and bundler |
| **Backend Framework** | Express.js | 4.18.2 | REST API server |
| **Runtime** | Node.js | 18+ | JavaScript runtime for server |
| **Styling** | CSS3 | - | Modern styling with gradients and animations |
| **Data Format** | JSON | - | Data storage and API communication |

### Full Dependency Tree

```
movies-countdown/
├── client/
│   ├── react (18.2.0)           # UI library
│   ├── react-dom (18.2.0)       # React rendering for browsers
│   └── vite (5.0.8)             # Build tool
│       └── @vitejs/plugin-react # React support for Vite
│
└── server/
    ├── express (4.18.2)         # Web framework
    └── cors (2.8.5)             # Cross-origin resource sharing
```

---

## Why These Technologies?

### React - Frontend UI Library

**What is it?**
React is a JavaScript library for building user interfaces. It lets you create reusable UI components.

**Why we chose it:**

| Reason | Explanation |
|--------|-------------|
| **Component-Based** | Break UI into small, reusable pieces (Header, MovieCard, etc.) |
| **Declarative** | Describe what UI should look like, React handles the updates |
| **Virtual DOM** | Efficient updates - only changes what's necessary |
| **Large Ecosystem** | Tons of tutorials, libraries, and community support |
| **Industry Standard** | Used by Facebook, Netflix, Airbnb - great for learning |

**Alternatives considered:**

| Framework | Why we didn't choose it |
|-----------|------------------------|
| Vue.js | Excellent choice, but React has larger job market |
| Angular | Steeper learning curve, more complex for small apps |
| Vanilla JS | Too much manual DOM manipulation for this use case |
| Svelte | Newer, smaller community, fewer learning resources |

### Vite - Build Tool

**What is it?**
Vite is a modern build tool that provides a fast development experience.

**Why we chose it:**

```
Traditional Build Tools (Webpack)     vs     Vite
─────────────────────────────────           ─────

1. Bundle everything first                  1. Serve files directly
2. Wait 30-60 seconds                       2. Start in < 1 second
3. Full rebuild on changes                  3. Only update changed file
4. Complex configuration                    4. Works out of the box

Startup Time:  ~30 seconds                  Startup Time: ~300ms
HMR Update:    ~2-5 seconds                 HMR Update:   ~50ms
```

**Key benefits:**
- **Instant Server Start**: No bundling needed during development
- **Lightning Fast HMR**: Hot Module Replacement updates in milliseconds
- **Simple Config**: Works great with zero configuration
- **Native ES Modules**: Uses browser's native import system

### Express.js - Backend Framework

**What is it?**
Express is a minimal web framework for Node.js that makes building APIs simple.

**Why we chose it:**

```javascript
// How simple Express is - complete server in ~20 lines
const express = require('express');
const app = express();

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.listen(3001);
```

| Reason | Explanation |
|--------|-------------|
| **Minimal** | No unnecessary complexity - you add what you need |
| **Flexible** | Works with any database, any frontend |
| **Well-documented** | Extensive docs and tutorials |
| **Middleware** | Easy to add features like CORS, logging, auth |
| **Same Language** | JavaScript on both frontend and backend |

**Alternatives considered:**

| Framework | Why we didn't choose it |
|-----------|------------------------|
| Fastify | Faster, but Express has more learning resources |
| Koa | More modern, but smaller community |
| NestJS | Too complex for a simple API |
| Django/Flask | Would require learning Python |

### CSS3 - Styling

**What is it?**
CSS (Cascading Style Sheets) controls how HTML elements look.

**Why vanilla CSS instead of frameworks:**

| Approach | Pros | Cons |
|----------|------|------|
| **Vanilla CSS** (our choice) | Full control, no dependencies, learn fundamentals | More code to write |
| Tailwind CSS | Fast development, utility classes | Learning curve, cluttered HTML |
| Styled Components | CSS-in-JS, scoped styles | Runtime overhead, additional dependency |
| SASS/SCSS | Variables, nesting | Build step required |

**Modern CSS features we use:**
- CSS Grid and Flexbox for layouts
- CSS Variables for theming
- Backdrop-filter for glassmorphism
- Animations and transitions
- Media queries for responsiveness

---

## Project Structure

```
movies-countdown/
│
├── client/                          # Frontend application
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── Header.jsx           # Search bar component
│   │   │   ├── MovieGrid.jsx        # Grid layout component
│   │   │   ├── MovieCard.jsx        # Individual movie card
│   │   │   └── CountdownModal.jsx   # Countdown timer modal
│   │   │
│   │   ├── App.jsx                  # Root component (state management)
│   │   ├── App.css                  # All styles
│   │   └── main.jsx                 # Application entry point
│   │
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   └── package.json                 # Frontend dependencies
│
├── server/                          # Backend application
│   ├── data/
│   │   └── movies.json              # Movie database (JSON file)
│   │
│   ├── index.js                     # Express server
│   └── package.json                 # Backend dependencies
│
├── USER_GUIDE.md                    # User documentation
└── TECHNICAL_DOCS.md                # This file
```

### Why This Structure?

```
Separation of Concerns
──────────────────────

┌─────────────────────────────────────────────────────────────┐
│                        client/                               │
│  Everything the user sees and interacts with                 │
│  - Can be deployed to CDN (Netlify, Vercel)                 │
│  - Could work with any backend                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        server/                               │
│  Data and business logic                                     │
│  - Can be deployed to any Node.js host                      │
│  - Could serve any frontend                                  │
└─────────────────────────────────────────────────────────────┘

Benefits:
✓ Independent deployment
✓ Different teams can work on each
✓ Easy to swap technologies
✓ Clear boundaries
```

---

## Frontend Architecture

### Component Hierarchy

```
App (Root Component)
│
│   Manages: movies[], searchTerm, selectedMovie, loading, error
│
├── Header
│   │
│   │   Props: searchTerm, onSearchChange
│   │   Purpose: Display logo and search input
│   │
│   └── <input> (Search Box)
│
├── MovieGrid
│   │
│   │   Props: movies[], onMovieClick
│   │   Purpose: Arrange movies in responsive grid
│   │
│   └── MovieCard (×N)
│       │
│       │   Props: movie, onClick, index
│       │   Purpose: Display single movie with gradient
│       │
│       └── <div> (Card Content)
│
└── CountdownModal (conditional)
    │
    │   Props: movie, onClose
    │   Purpose: Show countdown timer and movie details
    │
    └── useEffect (Timer - updates every second)
```

### Component Responsibility Pattern

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              App.jsx                                     │
│                         "Smart Component"                                │
│                                                                         │
│  Responsibilities:                                                      │
│  ✓ Fetch data from API                                                  │
│  ✓ Manage application state                                             │
│  ✓ Filter movies (search + release date)                                │
│  ✓ Handle user interactions                                             │
│  ✓ Pass data down to children                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
          ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
          │  Header.jsx │  │MovieGrid.jsx│  │CountdownModal│
          │   "Dumb"    │  │   "Dumb"    │  │   "Smart"   │
          │             │  │             │  │             │
          │ Only renders│  │ Only renders│  │ Has timer   │
          │ what it gets│  │ what it gets│  │ state       │
          └─────────────┘  └─────────────┘  └─────────────┘

"Smart" = Has its own state or side effects
"Dumb"  = Pure rendering based on props (easier to test and reuse)
```

---

## Backend Architecture

### Express Server Structure

```javascript
// server/index.js - Simplified view

const express = require('express');  // Web framework
const cors = require('cors');        // Allow cross-origin requests
const movies = require('./data/movies.json');  // Data source

const app = express();

// Middleware
app.use(cors());        // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Routes
app.get('/api/movies', ...);      // Get all movies
app.get('/api/movies/:id', ...);  // Get single movie

// Start server
app.listen(3001);
```

### Why CORS is Needed

```
Without CORS:
─────────────
Browser: "Hey localhost:5173, fetch data from localhost:3001"
Browser: "BLOCKED! Different origins are not allowed by default"

With CORS:
──────────
Server adds header: "Access-Control-Allow-Origin: *"
Browser: "Server says it's okay, allowing the request"


┌──────────────────┐                    ┌──────────────────┐
│   Frontend       │                    │    Backend       │
│   localhost:5173 │ ───── HTTP ─────▶  │   localhost:3001 │
│                  │                    │                  │
│  Different Port  │                    │  CORS Enabled    │
│  = Different     │                    │  = Allows cross- │
│    Origin        │                    │    origin access │
└──────────────────┘                    └──────────────────┘
```

---

## Data Flow

### Unidirectional Data Flow

React follows a "one-way data flow" pattern. Data flows down from parent to child via props.

```
                    ┌─────────────────┐
                    │      App        │
                    │                 │
                    │  movies: [...]  │──────────────────────────┐
                    │  searchTerm: "" │                          │
                    │  selectedMovie  │                          │
                    └────────┬────────┘                          │
                             │                                   │
           ┌─────────────────┼─────────────────┐                │
           │                 │                 │                │
           ▼                 ▼                 ▼                │
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
    │   Header    │  │  MovieGrid  │  │  Countdown  │          │
    │             │  │             │  │    Modal    │          │
    │ searchTerm  │  │  movies     │  │  movie      │◀─────────┘
    │ onChange────│──│  onClick────│──│  onClose    │
    └──────┬──────┘  └──────┬──────┘  └─────────────┘
           │                │
           │ User types     │ User clicks
           │                │
           ▼                ▼
    ┌─────────────────────────────────┐
    │  Callback functions update      │
    │  state in App component         │
    │                                 │
    │  setSearchTerm("spider")        │
    │  setSelectedMovie(movie)        │
    └─────────────────────────────────┘
           │
           │ State changes trigger re-render
           ▼
    ┌─────────────────────────────────┐
    │  React re-renders components    │
    │  with new data                  │
    └─────────────────────────────────┘
```

### Movie Filtering Flow

```javascript
// In App.jsx - How filtering works

const filteredMovies = movies.filter(movie => {
  // Step 1: Check if movie is upcoming
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const releaseDate = new Date(movie.releaseDate);
  const isUpcoming = releaseDate > today;

  // Step 2: Check if matches search
  const matchesSearch = movie.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  // Step 3: Must pass BOTH conditions
  return isUpcoming && matchesSearch;
});
```

```
Original Movies Array (53 movies)
              │
              ▼
┌─────────────────────────────┐
│  Filter: releaseDate > today │
│                              │
│  Removes 9 released movies   │
└─────────────────────────────┘
              │
              ▼
Upcoming Movies (44 movies)
              │
              ▼
┌─────────────────────────────┐
│  Filter: title includes      │
│          searchTerm          │
│                              │
│  Further reduces based on    │
│  user's search input         │
└─────────────────────────────┘
              │
              ▼
Displayed Movies (varies)
```

---

## Component Design

### MovieCard Component

```jsx
// Simplified version showing key concepts

function MovieCard({ movie, onClick, index }) {
  // Generate gradient based on index (8 different gradients)
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    // ... more gradients
  ];

  const gradientStyle = {
    background: gradients[index % gradients.length]
  };

  // Get initials for display
  const initials = movie.title
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 3)
    .toUpperCase();

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <div className="movie-poster" style={gradientStyle}>
        <span className="movie-initials">{initials}</span>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="genres">
          {movie.genres.slice(0, 2).map(genre => (
            <span key={genre} className="genre-tag">{genre}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### CountdownModal Component

```jsx
// Key pattern: useEffect for timers

function CountdownModal({ movie, onClose }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Effect runs on mount and cleans up on unmount
  useEffect(() => {
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup function - prevents memory leaks
    return () => clearInterval(timer);
  }, [movie.releaseDate]);

  function calculateTimeLeft() {
    const difference = new Date(movie.releaseDate) - new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  // Render countdown...
}
```

---

## State Management

### React useState Hook

```javascript
// State declaration
const [movies, setMovies] = useState([]);
//     │       │                    │
//     │       │                    └── Initial value (empty array)
//     │       └── Function to update the state
//     └── Current state value

// State updates trigger re-renders
setMovies(data);  // Component re-renders with new movies
```

### State Organization

```
┌─────────────────────────────────────────────────────────────┐
│                    App Component State                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  movies: Movie[]                                            │
│  ├── Source: Fetched from API on mount                      │
│  └── Used by: MovieGrid (via filteredMovies)                │
│                                                             │
│  searchTerm: string                                         │
│  ├── Source: User input in Header                           │
│  └── Used by: Filtering logic, Header display               │
│                                                             │
│  selectedMovie: Movie | null                                │
│  ├── Source: User clicks MovieCard                          │
│  └── Used by: CountdownModal (when not null)                │
│                                                             │
│  loading: boolean                                           │
│  ├── Source: Set during API fetch                           │
│  └── Used by: Conditional rendering                         │
│                                                             │
│  error: string | null                                       │
│  ├── Source: API fetch failure                              │
│  └── Used by: Error display                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Why Not Redux/Context?

For this application, `useState` is sufficient because:

| Factor | Our App | When to use Redux/Context |
|--------|---------|---------------------------|
| Component depth | 2-3 levels | 5+ levels of prop drilling |
| State complexity | Simple objects | Complex nested state |
| State sharing | Parent-child only | Sibling components need same state |
| Team size | 1 developer | Large team needing predictability |

---

## Styling Approach

### CSS Architecture

```
App.css
│
├── CSS Variables (Custom Properties)
│   └── Define colors, spacing, etc. once
│
├── Base Styles
│   └── Body, reset, typography
│
├── Component Styles
│   ├── .header { ... }
│   ├── .movie-grid { ... }
│   ├── .movie-card { ... }
│   └── .modal { ... }
│
└── Responsive Styles
    └── @media queries for different screens
```

### Key CSS Techniques Used

**1. CSS Grid for Layout:**
```css
.movie-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4 equal columns */
  gap: 24px;                               /* Space between items */
}
```

**2. Flexbox for Alignment:**
```css
.header {
  display: flex;
  justify-content: space-between;  /* Logo left, search right */
  align-items: center;             /* Vertically centered */
}
```

**3. CSS Variables for Theming:**
```css
:root {
  --bg-primary: #0a0a0f;
  --accent-cyan: #00d4ff;
}

.button {
  background: var(--accent-cyan);  /* Easy to change theme */
}
```

**4. Glassmorphism Effect:**
```css
.modal {
  background: rgba(26, 26, 37, 0.95);
  backdrop-filter: blur(20px);  /* Frosted glass effect */
}
```

**5. Responsive Design:**
```css
/* Desktop: 4 columns */
.movie-grid {
  grid-template-columns: repeat(4, 1fr);
}

/* Tablet: 3 columns */
@media (max-width: 1024px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mobile: 2 columns */
@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## API Design

### RESTful Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/api/movies` | Get all movies | `Movie[]` |
| GET | `/api/movies/:id` | Get movie by ID | `Movie` or 404 |

### Movie Data Schema

```javascript
{
  "id": 1,                              // Unique identifier
  "title": "Return to Silent Hill",     // Movie name
  "releaseDate": "2026-01-23",          // ISO date format
  "description": "A new adaptation...", // Plot summary
  "genres": ["Horror", "Thriller"],     // Array of genres
  "director": "Christophe Gans",        // Director name
  "cast": ["Actor 1", "Actor 2"],       // Main cast
  "region": "USA",                      // Production country
  "streaming": "Netflix"                // Optional: streaming platform
}
```

### Why JSON for Data Storage?

For this application, a JSON file is appropriate because:

| Factor | Our Approach (JSON) | When to use a Database |
|--------|---------------------|------------------------|
| Data size | ~50 movies | Thousands of records |
| Write operations | None (read-only) | Frequent updates |
| Concurrent users | Low | High traffic |
| Relationships | None | Complex relations |
| Setup complexity | Zero | Requires installation |

---

## Key Design Decisions

### 1. Client-Side Filtering

**Decision:** Filter released movies in the frontend, not backend.

```
Option A: Backend Filtering          Option B: Client-Side Filtering
──────────────────────────          ──────────────────────────────
GET /api/movies?upcoming=true        GET /api/movies (returns all)
Server filters before sending        Client filters after receiving

Pros:                                Pros:
- Less data transferred              - Simpler API
- Server controls logic              - Instant filter changes
                                     - No API changes needed
Cons:
- API changes for new filters        Cons:
- More server work                   - More data transferred initially

We chose Option B because:
✓ Dataset is small (53 movies)
✓ Enables instant search without API calls
✓ Simpler backend implementation
```

### 2. Single CSS File

**Decision:** Keep all styles in one `App.css` file.

```
Option A: Single CSS File            Option B: CSS Modules
─────────────────────────            ────────────────────
App.css (contains all styles)        Header.module.css
                                     MovieCard.module.css
                                     Modal.module.css

We chose Option A because:
✓ Small application (< 500 lines of CSS)
✓ Easier to see all styles at once
✓ No build configuration needed
✓ Good for learning CSS fundamentals
```

### 3. No External UI Library

**Decision:** Build UI components from scratch instead of using Material-UI, Chakra, etc.

```
Benefits of our approach:
✓ Learn how components actually work
✓ Full control over design
✓ Smaller bundle size
✓ No dependency updates to manage

Trade-offs:
✗ More code to write
✗ No built-in accessibility features
✗ Must implement responsive design manually
```

### 4. Separate Frontend and Backend

**Decision:** Keep client and server as separate applications.

```
Alternative: Full-Stack Framework (Next.js, Remix)
─────────────────────────────────────────────────
- Single codebase for frontend and backend
- Server-side rendering built-in
- More complex but more features

Our Approach: Separate Client + Server
──────────────────────────────────────
- Clear separation of concerns
- Each can be deployed independently
- Easier to understand for learning
- Industry-standard architecture
```

---

## Learning Resources

### React

| Resource | Type | Link |
|----------|------|------|
| Official React Docs | Documentation | https://react.dev |
| React Tutorial | Interactive | https://react.dev/learn |
| Codecademy React | Course | https://codecademy.com/learn/react-101 |

### JavaScript

| Resource | Type | Link |
|----------|------|------|
| MDN JavaScript Guide | Documentation | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide |
| JavaScript.info | Tutorial | https://javascript.info |
| Eloquent JavaScript | Book (Free) | https://eloquentjavascript.net |

### CSS

| Resource | Type | Link |
|----------|------|------|
| MDN CSS | Documentation | https://developer.mozilla.org/en-US/docs/Web/CSS |
| CSS Tricks | Articles | https://css-tricks.com |
| Flexbox Froggy | Game | https://flexboxfroggy.com |
| Grid Garden | Game | https://cssgridgarden.com |

### Express.js

| Resource | Type | Link |
|----------|------|------|
| Express Docs | Documentation | https://expressjs.com |
| MDN Express Tutorial | Tutorial | https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs |

### General Web Development

| Resource | Type | Link |
|----------|------|------|
| freeCodeCamp | Course | https://freecodecamp.org |
| The Odin Project | Curriculum | https://theodinproject.com |
| Web.dev by Google | Best Practices | https://web.dev |

---

## Glossary

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface - how software components communicate |
| **Component** | Reusable piece of UI in React |
| **CORS** | Cross-Origin Resource Sharing - security feature for web requests |
| **DOM** | Document Object Model - browser's representation of HTML |
| **Hook** | React function (like useState) that lets you use React features |
| **JSX** | JavaScript XML - syntax for writing HTML in JavaScript |
| **Middleware** | Functions that process requests before route handlers |
| **Props** | Data passed from parent to child component |
| **REST** | Representational State Transfer - API design pattern |
| **State** | Data that changes over time and affects rendering |
| **Virtual DOM** | React's lightweight copy of the DOM for efficient updates |

---

*This documentation was created to help developers new to frontend development understand modern web application architecture.*
