const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`;

  console.log("API URL:", url);
  console.log("API KEY:", API_KEY);

  try {
    const response = await fetch(url);

    const data = await response.json();

    console.log("OMDb Response:", data);

    if (data.Response === "False") {
      throw new Error(data.Error || "Movie not found");
    }

    return data.Search || [];
  } catch (error) {
    console.error("OMDb Error:", error);
    throw new Error(error.message);
  }
};