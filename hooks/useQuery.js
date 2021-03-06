import * as React from 'react'

function useQuery(key, fetcher, deps = []) {
	const [data, setData] = React.useState(null)
	const [error, setError] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)
	const [isError, setIsError] = React.useState(false)

	const refetch = async () => {
		try {
			const data = await fetcher()
			setData(data)
		} catch (error) {
			setIsError(true)
			setError(error)
		}
	}

	React.useEffect(() => {
		let mounted = true
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const data = await fetcher()
				if (mounted) {
					setData(data)
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
	}, [key, ...deps])

	return {
		data,
		error,
		isLoading,
		isError,
		refetch,
		setData,
	}
}

export default useQuery
