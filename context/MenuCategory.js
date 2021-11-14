import * as React from 'react'
import { useUserResto } from './Resto'
import * as MenuApi from '../firebase/menu'

const MenuCategoryContext = React.createContext(null)

export const MenuCategoryProvider = ({ children }) => {
	const [menuCategories, setMenuCategories] = React.useState([])
	const [initLoading, setInitLoading] = React.useState(true)
	const { currentResto } = useUserResto()

	const addMenuCategory = async (menuCat) => {
		try {
			await MenuApi.createMenuCategory({ menuCat, restoId: currentResto.id })
			setMenuCategories((p) => [...p, menuCat])
		} catch (error) {
			throw error
		}
	}

	const updateMenuCategory = async (menuCategory) => {
		try {
			await MenuApi.updateMenuCategory({
				menuCategory,
				restoId: currentResto.id,
			})
			setMenuCategories((p) =>
				p.map((item) => (item.id === menuCategory.id ? menuCategory : item))
			)
		} catch (error) {
			throw error
		}
	}

	const deleteMenuCategory = async (menuCategory) => {
		try {
			await MenuApi.deleteMenuCategory({
				menuCategory,
				restoId: currentResto.id,
			})
			setMenuCategories((p) => p.filter((item) => item.id !== menuCategory.id))
		} catch (error) {
			throw error
		}
	}

	React.useEffect(() => {
		if (currentResto) {
			const fetchData = async () => {
				try {
					const data = await MenuApi.getMenuCategories(currentResto.id)
					setMenuCategories(data)
					setInitLoading(false)
				} catch (error) {
					console.log(error)
				}
			}
			fetchData()
		}
	}, [currentResto])

	const value = {
		menuCategories,
		initLoading,
		addMenuCategory,
		updateMenuCategory,
		deleteMenuCategory,
	}

	return (
		<MenuCategoryContext.Provider value={value}>
			{children}
		</MenuCategoryContext.Provider>
	)
}

export const useMenuCategory = () => {
	const ctx = React.useContext(MenuCategoryContext)
	if (ctx === undefined) throw new Error('Context not provided!')
	return ctx
}
