export const getFavoriteMenu = (orders) => {
	function mode(array) {
		if (array.length == 0) return null
		var modeMap = {}
		var maxEl = array[0],
			maxCount = 1
		for (var i = 0; i < array.length; i++) {
			var el = array[i]
			if (modeMap[el] == null) modeMap[el] = 1
			else modeMap[el]++
			if (modeMap[el] > maxCount) {
				maxEl = el
				maxCount = modeMap[el]
			}
		}
		return maxEl
	}

	const allMenusId = orders.reduce((prev, curr) => {
		return [...prev, ...curr.items.map(i => i.id)]
	}, [])

	const allMenus = orders.reduce((prev, curr) => {
		return [...prev, ...curr.items]
	}, [])

	const favoriteMenu =  allMenus.find( i => i.id === mode(allMenusId))

	return favoriteMenu
}
