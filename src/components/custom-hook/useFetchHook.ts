import {useCallback, useState} from 'react'

interface IFetchHookProps {
    url: string
}

export const useFetchHook = (props: IFetchHookProps) => {

    const {url} = props

    const [response, setResponse] = useState(null)
    const [isRequestPending, setRequestPending] = useState(false)

    const fetchData = useCallback(async (method: string, body?: any) => {
        try {
            setRequestPending(true)
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const responseData = await response.json()

            setResponse(responseData)

        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setRequestPending(false)
        }
    }, [url])

    return {
        response,
        fetchData,
        isRequestPending
    }
}
