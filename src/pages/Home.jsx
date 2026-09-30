import { useState } from "react";
import { searchMovies } from "../services/movieApi.js";
function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSearch = async () => {
    if (!search.trim()) {
      setError("Please enter a movie name.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const data = await searchMovies(search);
      setMovies(data);
    } catch (err) {
      setMovies([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="home">
      <h1>Movie Explorer</h1>
      <p>Search for your favorite movies</p>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>
          Search
        </button>
      </div>
      {loading && <p>Loading movies...</p>}
      {error && <p className="error">{error}</p>}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            {movie.Poster !== "N/A" ? (
              <img src={movie.Poster} alt={movie.Title} />
            ) : (
              <div className="no-poster">No Poster</div>
            )}

            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;