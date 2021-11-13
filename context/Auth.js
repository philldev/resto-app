import { onAuthStateChanged } from '@firebase/auth'
import * as React from 'react'
import * as AuthApi from '../firebase/auth'
import * as UserApi from '../firebase/user'
import * as RestoApi from '../firebase/resto'

const AuthContext = React.createContext(null)

export const AuthProvider = ({ children }) => {
	const [user, setUser] = React.useState(undefined)
	const signup = async ({ email, password }) => {
		try {
			const newUserCred = await AuthApi.signup({ email, password })
			await UserApi.createUser({ email, password, uid: newUserCred.user.uid })
		} catch (error) {
			throw error
		}
	}
	const signin = async ({ email, password }) => {
		try {
			await AuthApi.signin({ email, password })
		} catch (error) {
			throw error
		}
	}
	const signout = async () => {
		try {
			await AuthApi.signout()
		} catch (error) {
			throw error
		}
	}

	const addUserResto = async (newResto) => {
		try {
			const resto = await RestoApi.createResto({ resto : newResto, user })
			setUser((p) => ({ ...p, restaurantList: [...p.restaurantList, resto] }))
		} catch (error) {
			throw error
		}
	}

	React.useEffect(() => {
		const unsub = onAuthStateChanged(AuthApi.fbAuth, async (user) => {
			if (user) {
				try {
					const userData = await UserApi.getUser(user.uid)
					const restaurantList = await RestoApi.getRestoList(user.uid)
					setUser({ ...userData, restaurantList })
				} catch (error) {
					console.log(error)
				}
			} else {
				setUser(null)
			}
		})
		return () => {
			unsub()
		}
	}, [])

	const value = {
		user,
		signup,
		signin,
		signout,
		addUserResto
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const context = React.useContext(AuthContext)
	if (context === undefined) throw new Error('Auth Context not provided')
	return context
}
