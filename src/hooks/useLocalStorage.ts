import { useEffect, useState } from "react";

//fucntion with parameters key and initialValue, initialValue can be any type of data or a function that returns a value of any type
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    //useState hook to store the value in the state
    const [value, setValue] = useState<T>(() => {
        //if the key is already present in the local storage, then return the value from the local storage
        const jsonValue = localStorage.getItem(key);

        //if the key is not present in the local storage, then return the initialValue
        if (jsonValue != null) return JSON.parse(jsonValue);

        //if the initialValue is a function, then return the value returned by the function
        if (typeof initialValue === "function") {
            return initialValue as <T>() => T;
        }
        //if the initialValue is not a function, then return the initialValue
        else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as [typeof value, typeof setValue];
}
