function MovieCard({ movie, onClick }) {
  const getInitials = (title) => {
    return title
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 3)
      .toUpperCase()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
  ]

  const gradient = gradients[movie.id % gradients.length]

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster" style={{ background: gradient }}>
        <span className="movie-initials">{getInitials(movie.title)}</span>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-date-badge">{formatDate(movie.releaseDate)}</div>
        <div className="movie-genres">
          {movie.genres.slice(0, 2).map((genre, index) => (
            <span key={index} className="genre-tag">{genre}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
