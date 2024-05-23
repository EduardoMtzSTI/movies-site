const APY_KEY = "257ac51f";

export const searchMovies = async ({ query }) => {

    if (query === "") return;
    try {
        const data = await fetch(`https://www.omdbapi.com/?apikey=${APY_KEY}&s=${query}`)
        const json = await data.json();
        const movies = json.Search;

        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
        }))
    } catch (e) {
        throw new Error("Error al realizar la busqueda.")
    }

}