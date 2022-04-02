import { useState, useEffect } from "react";

export default function useSearchRecipe(list) {
    const [query, setQuery] = useState("");
    const filteredList = list.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );
    useEffect(() => {
        setQuery(sessionStorage.getItem("query") || "");
    }, []);
    useEffect(() => {
        sessionStorage.setItem("query", query);
    }, [query]);
    return { filteredList, query, setQuery };
}
