import MovieCard from './MovieCard'

function MovieGrid({ movies, onMovieClick }) {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onMovieClick(movie)}
        />
      ))}
    </div>
  )
}

export default MovieGrid
