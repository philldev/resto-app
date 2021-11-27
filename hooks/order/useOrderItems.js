import * as React from 'react'
import { useUserResto } from '../../context/Resto'
import * as OrderApi from '../../firebase/order'

export const useOrderItems = (status) => {
	const { currentResto } = useUserResto()
	const [isLoading, setIsloading] = React.useState(false)
	const [items, setItems] = React.useState([])

	React.useEffect(() => {
		let mounted = true

		const fetchItems = async () => {
			setIsloading(true)
			try {
				const orderItems = await OrderApi.getOrders(currentResto.id, status)
				if (mounted) setItems(orderItems)
			} catch (error) {
				console.log(error)
			} finally {
				setIsloading(false)
			}
		}

		fetchItems()

		return () => {
			mounted = false
		}
	}, [status, currentResto.id])

	return { items, isLoading }
}
