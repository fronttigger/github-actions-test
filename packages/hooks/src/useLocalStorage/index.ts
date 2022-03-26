import { useState, useCallback } from 'react'

function useLocalStorage<T>(key: string, defaultValue: T): [value: T, setValue: (value: T) => void]{
    const [value, setValue] = useState(() => {
        if (typeof window === 'undefined') {
            return defaultValue
        }

        return JSON.parse(window.localStorage.getItem(key) || 'null') ?? defaultValue
    })

    const handleValue = useCallback((value: T) => {
        setValue(value)
        window.localStorage.setItem(key, JSON.stringify(value))
    }, [])

    return [value, handleValue]
}

export default useLocalStorage