import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function DebounceSearchDemo() {
    const [searchText, setSearchText] = useState("");
    const debouncedSearchText = useDebounce(searchText, 500);

    // Pretend API call: only runs when the debounced value changes

    useEffect(()=> {
        if (debouncedSearchText) {
            console.log(`Searching for: ${debouncedSearchText}`)
        }
    }, [debouncedSearchText])

    return (
        <div>
            <h2>Debounce Search Demo</h2>

            <input
              type="text"
              placeholder="Enter something..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <p><strong>Current value:</strong> {searchText}</p>
            <p><strong>Debounced value: (500ms later):</strong> {debouncedSearchText}</p>
        </div>
    );
}