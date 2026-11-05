import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Start Timer
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)

        // If value or delay changes before the timer ends, cancel the old timer 
        return () => clearTimeout(timer)
    }, [value, delay]);
    
    return debouncedValue;
}