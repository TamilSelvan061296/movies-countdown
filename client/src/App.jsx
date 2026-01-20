import { useState, useEffect } from 'react'
import Header from './components/Header'
import MovieGrid from './components/MovieGrid'
import CountdownModal from './components/CountdownModal'

function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/movies')
      if (!response.ok) throw new Error('Failed to fetch movies')
      const data = await response.json()
      setMovies(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const filteredMovies = movies.filter(movie => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const releaseDate = new Date(movie.releaseDate)
    const isUpcoming = releaseDate > today
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    return isUpcoming && matchesSearch
  })

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
  }

  const handleCloseModal = () => {
    setSelectedMovie(null)
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading movies...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="app">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <main className="main-content">
        {filteredMovies.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🎬</span>
            <p>No movies found matching "{searchTerm}"</p>
          </div>
        ) : (
          <MovieGrid movies={filteredMovies} onMovieClick={handleMovieClick} />
        )}
      </main>
      {selectedMovie && (
        <CountdownModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default App
