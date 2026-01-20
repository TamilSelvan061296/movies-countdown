import { useState } from 'react'
import Header from './components/Header'
import MovieGrid from './components/MovieGrid'
import CountdownModal from './components/CountdownModal'
import moviesData from './data/movies.json'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)

  const filteredMovies = moviesData.filter(movie => {
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
