function SearchBar({ search, setSearch, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      onSearch();
    }
  };
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}
export default SearchBar;