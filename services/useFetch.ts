/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";


const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null);


    const fetchData = async ($id: any) => {

        try {
            setLoading(true)
            setError(null)

            const result = await fetchFunction();
            setData(result);

        } catch (err) {
            // @ts-ignore
            setError(err instanceof Error ? err : new Error('An error occured'))

        } finally {
            setLoading(false)
        }
    }

    const reset = () => {
        setData(null)
        setLoading(false)
        setError(null)
    }

    useEffect(() => {
        autoFetch && fetchData(null);
    }, [])

    return { data, loading, error, refetch: fetchData, reset }
}

export default useFetch;