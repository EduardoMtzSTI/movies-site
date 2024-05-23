import { useState, useEffect, useRef } from "react";

export function useSearch() {
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const isFirstLoad = useRef(true);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = query === "";
            if (isFirstLoad.current) return;
        }
        if (query === "") {
            setError("Ingrese un titulo para realizar al busqueda.");
            return;
        }
        if (query.match(/^\d+$/)) {
            setError("No se admiten solo numeros.");
            return;
        }
        if (query.length < 3) {
            setError("Ingrese almenos 3 letras para realizar la busqueda.");
            return;
        }
        setError(null);
    }, [query]);

    const updateQuery = (query) => {
        setQuery(query);
    };

    return { updateQuery, query, error };
}
