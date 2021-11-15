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

	const updateMenu = (menu) => {
		if (currentResto) {
			try {
			} catch (error) {}
		}
	}

	const deleteMenu = (menu) => {
		if (currentResto) {
			try {
			} catch (error) {}
		}
	}

	React.useEffect(() => {
		if (currentResto) {
			const fetchData = async () => {
				try {
					const menus = MenusApi.getMenus(currentResto.id, 'all', {
						listen: true,
						callback: async (menus) => {
							setMenus(menus)
						},
					})
				} catch (error) {
					console.log(error)
				} finally {
					setInitLoading(false)
				}
			}
			fetchData()
		}
	}, [currentResto])

	const value = { menus, initLoading, addMenu }
	return <MenusContext.Provider value={value}>{children}</MenusContext.Provider>
}

export const useMenus = () => {
	const ctx = React.useContext(MenusContext)
	if (ctx === undefined) throw new Error('No Context Provided')
}
