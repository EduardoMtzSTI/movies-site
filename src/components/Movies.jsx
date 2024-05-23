export function Movies({ movies, loading }) {
  const hasMovies = movies?.length > 0;
  return (
    <>
      {loading ? (
        <p>Loading..</p>
      ) : hasMovies ? (
        movies?.map((movie) => (
          <article key={movie.id} className="card">
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img
              src={movie.poster}
              alt={`poster de la pelicula "${movie.title}"`}
            ></img>
          </article>
        ))
      ) : (
        <p>Sin resultados</p>
      )}
    </>
  );
}
