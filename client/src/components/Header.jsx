function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🎬</span>
          <h1>2026 Movie Countdown</h1>
        </div>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>
    </header>
  )
}

export default Header
