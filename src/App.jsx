import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";

function App() {
  const { query, error, updateQuery } = useSearch();
  const { movies, loading, sort, debounceGetMovies, getMovies, updateSort } =
    useMovies({ query });

  const handleChange = (event) => {
    const newQuery = event.target.value.trim();
    updateQuery(newQuery);
    debounceGetMovies(newQuery);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (error !== null) return;
    getMovies({ query });
  };

  const handleSort = () => {
    updateSort();
  };

  return (
    <main className="content">
      <section className="head">
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="titulo"
            type="text"
            placeholder="Robin hood, Batman.."
          ></input>
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </section>
      <section className="results">
        <Movies movies={movies} loading={loading} />
      </section>
    </main>
  );
}

export default App;
