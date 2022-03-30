import { useState } from "react";

export default function useSearchRecipe(list) {
    const [query, setQuery] = useState("");
    const filteredList = list.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );
    return { filteredList, query, setQuery };
}
