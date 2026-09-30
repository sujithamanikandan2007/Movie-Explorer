import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">

      {movie.Poster !== "N/A" ? (
        <img
          src={movie.Poster}
          alt={movie.Title}
        />
      ) : (
        <div className="no-poster">
          No Image
        </div>
      )}

      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <p>📅 {movie.Year}</p>

        <p>🎬 {movie.Type}</p>
      </div>

    </Link>
  );
}

export default MovieCard;