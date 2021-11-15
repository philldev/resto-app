import * as React from 'react'
import { useUserResto } from './Resto'
import * as MenusApi from '../firebase/menu'

const MenusContext = React.createContext(null)

export const MenusProvider = ({ children }) => {
	const [menus, setMenus] = React.useState([])
	const [initLoading, setInitLoading] = React.useState(true)
	const { currentResto } = useUserResto()

	const addMenu = async (menu) => {
		if (currentResto) {
			try {
				await MenusApi.createMenu({ restoId: currentResto.id, menu })
				setMenus((p) => [...p, menu])
			} catch (error) {
				throw error
			}
		}
	}

	const updateMenu = async (menu) => {
		if (currentResto) {
			await MenusApi.updateMenu({ restoId: currentResto.id, menu })
			setMenus((p) => p.map((i) => (i.id === menu.id ? menu : i)))
			try {
			} catch (error) {
				throw error
			}
		}
	}

	const deleteMenu = async (menu) => {
		if (currentResto) {
			try {
				await MenusApi.deleteMenu({ restoId: currentResto.id, menu })
				setMenus((p) => p.filter((i) => i.id !== menu.id))
			} catch (error) {
				throw error
			}
		}
	}

	React.useEffect(() => {
		if (currentResto) {
			const fetchData = async () => {
				try {
					const menus = await MenusApi.getMenus(currentResto.id, 'all')
					console.log(menus)
					setMenus(menus)
				} catch (error) {
					console.log(error)
				} finally {
					setInitLoading(false)
				}
			}
			fetchData()
		}
	}, [currentResto])

	const value = { menus, initLoading, addMenu, updateMenu, deleteMenu }
	return <MenusContext.Provider value={value}>{children}</MenusContext.Provider>
}

export const useMenus = () => {
	const ctx = React.useContext(MenusContext)
	if (ctx === undefined) throw new Error('No Context Provided')

	return ctx
}
