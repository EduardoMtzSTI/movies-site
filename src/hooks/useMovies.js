import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/movies";
import debounce from "just-debounce-it";

export function useMovies({ query, iniSort = false }) {
    const [sort, setSort] = useState(iniSort);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const previousSearch = useRef(query)

    const getMovies = useCallback(async ({ query }) => {
        if (previousSearch.current === query) return;
        try {
            setLoading(true)
            const newMovies = await searchMovies({ query });
            setMovies(newMovies);
            previousSearch.current = query;
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }

    }, [])

    const updateSort = () => {
        setSort(!sort)
    }

    const sortedMovies = useMemo(() => {
        return sort ?
            (movies && [...movies].sort((a, b) => a.title.localeCompare(b.title))) : movies
    }, [sort, movies]);

    const debounceGetMovies = useCallback(
        debounce((query) => {
            getMovies({ query });
        }, 300),
        [getMovies]
    );

    return { movies: sortedMovies, sort, loading, error, getMovies, updateSort, debounceGetMovies }
}