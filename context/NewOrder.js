import * as React from 'react'

const NewOrder = React.createContext(null)

export const OrderTypeEnum = {
	TAKE_AWAY : 'TAKE_AWAY',
	DINE_IN : 'DINE_IN',
}

export const NewOrderProvider = ({ children }) => {
	const [orderItems, setOrderItems] = React.useState([])
	const [orderType, setOrderType] = React.useState(null)

	const chooseOrderType = (type) => {
		setOrderType(type)
	}

	const incrementItemQty = (menu) => {
		const exist = orderItems.find( i => i.id === menu.id)
		if (!exist) addItem(menu)
		else
			setOrderItems((p) =>
				p.map((item) =>
					item.id === menu.id ? { ...item, qty: item.qty++ } : item
				)
			)
	}

	const decrementItemQty = (menu) => {
		const exist = orderItems.find(i => i.id === menu.id)
		if (exist && menu.qty === 1) removeItem(menu)
		else
			setOrderItems((p) =>
				p.map((item) =>
					item.id === menu.id ? { ...item, qty: item.qty-- } : item
				)
			)
	}

	const removeItem = (menu) => {
		setOrderItems((p) => p.filter((item) => item.id !== menu.id))
	}

	const addItem = (menu) => {
		setOrderItems((p) => [...p, { ...menu, qty: 1 }])
	}

	const getTotal = React.useMemo( () => () => {
		return orderItems.reduce((pVal, cVal) => {
				return pVal + (cVal.qty * cVal.price)
		}, 0 )
	}, [orderItems])

	const getTotalQty = React.useMemo( () => () => {
		return orderItems.reduce((pVal, cVal) => {
				return pVal + cVal.qty 
		}, 0 )
	}, [orderItems])


	const value = {
		orderItems,
		incrementItemQty,
		decrementItemQty,
		getTotal,
		getTotalQty,
		orderType,
		chooseOrderType
	}

	return <NewOrder.Provider value={value}>{children}</NewOrder.Provider>
}

export const useNewOrder = () => {
	const ctx = React.useContext(NewOrder)
	if (ctx === undefined) throw new Error('Context not provided')
	return ctx
}
