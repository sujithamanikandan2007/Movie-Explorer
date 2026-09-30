import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { getMovieDetails } from "../services/movieApi.js";
function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        setError(
          error.message || "Unable to load movie details."
        );
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }
  if (!movie) {
    return null;
  }
  return (
    <main className="details-container">
      <Link to="/" className="back-button">
        ← Back to Movies
      </Link>
      <div className="details">
        <div className="details-poster">
          {movie.Poster && movie.Poster !== "N/A" ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
            />
          ) : (
            <div className="large-no-poster">
              🎬
              <p>No Poster</p>
            </div>
          )}
        </div>
        <div className="details-info">
          <h1>{movie.Title}</h1>
          <p className="rating">
            ⭐{" "}
            {movie.imdbRating !== "N/A"
              ? movie.imdbRating
              : "N/A"}{" "}
            / 10
          </p>
          <p>
            <strong>Year:</strong>{" "}
            {movie.Year}
          </p>
          <p>
            <strong>Genre:</strong>{" "}
            {movie.Genre}
          </p>
          <p>
            <strong>Runtime:</strong>{" "}
            {movie.Runtime}
          </p>
          <p>
            <strong>Director:</strong>{" "}
            {movie.Director}
          </p>
          <p>
            <strong>Actors:</strong>{" "}
            {movie.Actors}
          </p>
          <h2>Overview</h2>
          <p className="plot">
            {movie.Plot}
          </p>
        </div>
      </div>
    </main>
  );
}
export default MovieDetails;