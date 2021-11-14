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

	const updateUserResto = async (restoId, updatedResto) => {
		try {
			await RestoApi.updateResto({ restoId, updatedResto })
			setRestoList((p) =>
				p.map((resto) => (resto.id === restoId ? updatedResto : resto))
			)
			if (currentResto.id === restoId) {
				setCurrentResto(updatedResto)
			}
		} catch (error) {
			throw error
		}
	}

	const deleteUserResto = async (restoId) => {
		try {
			await RestoApi.deleteResto({ restoId })
			setRestoList((p) => p.filter((resto) => resto.id !== restoId))
			if (currentResto.id === restoId) {
				setCurrentResto(null)
			}
		} catch (error) {
			throw error
		}
	}

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const restaurantList = await RestoApi.getRestoList(user.id)
				setRestoList(restaurantList)
				setCurrentResto(null)
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
		updateUserResto,
		deleteUserResto,
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
