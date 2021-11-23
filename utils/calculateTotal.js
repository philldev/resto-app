export const getTotal = (orderItems = []) => {
	return orderItems.reduce((pVal, cVal) => {
		return pVal + cVal.qty * cVal.price
	}, 0)
}

export const getTotalQty = (orderItems = []) => {
	return orderItems.reduce((pVal, cVal) => {
		return pVal + cVal.qty
	}, 0)
}
