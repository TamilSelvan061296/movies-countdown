import { useState, useEffect } from 'react'

function CountdownModal({ movie, onClose }) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateCountdown = () => {
      const releaseDate = new Date(movie.releaseDate + 'T00:00:00')
      const now = new Date()
      const diff = releaseDate - now

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      return { days, hours, minutes, seconds }
    }

    setCountdown(calculateCountdown())
    const interval = setInterval(() => {
      setCountdown(calculateCountdown())
    }, 1000)

    return () => clearInterval(interval)
  }, [movie.releaseDate])

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onClose()
    }
  }

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
      weekday: 'long',
      month: 'long',
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
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-poster" style={{ background: gradient }}>
          <span className="modal-initials">{getInitials(movie.title)}</span>
        </div>

        <div className="modal-details">
          <h2 className="modal-title">{movie.title}</h2>

          <div className="countdown-container">
            <div className="countdown-item">
              <span className="countdown-value">{countdown.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.hours).padStart(2, '0')}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.minutes).padStart(2, '0')}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.seconds).padStart(2, '0')}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>

          <p className="modal-description">{movie.description}</p>

          <div className="modal-meta">
            <div className="modal-release-date">
              <span className="meta-label">Release Date</span>
              <span className="meta-value">{formatDate(movie.releaseDate)}</span>
            </div>
            {movie.director && (
              <div className="modal-director">
                <span className="meta-label">Director</span>
                <span className="meta-value">{movie.director}</span>
              </div>
            )}
          </div>

          {movie.cast && movie.cast.length > 0 && (
            <div className="modal-cast">
              <span className="meta-label">Cast</span>
              <span className="meta-value">{movie.cast.join(', ')}</span>
            </div>
          )}

          <div className="modal-genres">
            {movie.genres.map((genre, index) => (
              <span key={index} className="modal-genre-tag">{genre}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountdownModal
