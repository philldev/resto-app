import * as React from 'react'

const cache = {}

function useQuery(key, fetcher) {
	const [data, setData] = React.useState(cache[key] ?? null)
	const [error, setError] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)
	const [isError, setIsError] = React.useState(false)

	const refetch = async () => {
		try {
			setIsLoading(true)
			const data = await fetcher()
			setData(data)
			cache[key] = data
		} catch (error) {
			setIsError(true)
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}

	React.useEffect(() => {
		let mounted = true
		const fetchData = async () => {
			if (!cache[key])
				try {
					setIsLoading(true)
					const data = await fetcher()
					if (mounted) {
						setData(data)
						cache[key] = data
					}
				} catch (error) {
					setIsError(true)
					setError(error)
				} finally {
					if (mounted) setIsLoading(false)
				}
		}
		fetchData()

		return () => {
			mounted = false
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key])

	return {
		data,
		error,
		isLoading,
		isError,
		refetch,
	}
}

export default useQuery
