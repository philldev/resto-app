import * as React from 'react'
import { useAuth } from './auth'
import * as RestoApi from '../firebase/resto'

const UserRestoContext = React.createContext(null)

export const UserRestoProvider = ({ children }) => {
	const [currentResto, setCurrentResto] = React.useState(undefined)
	const [restoList, setRestoList] = React.useState(undefined)
	const [initLoading, setInitLoading] = React.useState(true)

	const { user } = useAuth()

	const selectResto = (resto) => {
		setCurrentResto(resto)
	}

	const addUserResto = async (newResto) => {
		try {
			const resto = await RestoApi.createResto({ resto: newResto, user })
			setRestoList((p) => [...p, resto])
		} catch (error) {
			throw error
		}
	}

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const restaurantList = await RestoApi.getRestoList(user.id)
				setRestoList(restaurantList)
				setInitLoading(false)
			} catch (error) {
				console.log(error)
				setInitLoading(false)
			}
		}
		if (user) {
			fetchData()
		}
	}, [user])

	const value = {
		addUserResto,
		selectResto,
		currentResto,
		restoList,
		initLoading,
	}

	return (
		<UserRestoContext.Provider value={value}>
			{children}
		</UserRestoContext.Provider>
	)
}

export const useUserResto = () => {
	const ctx = React.useContext(UserRestoContext)
	if (ctx === undefined) throw new Error('Resto Provider not available')
	return ctx
}
