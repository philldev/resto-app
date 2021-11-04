import { Box } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'
import * as React from 'react'
import * as AuthApi from '../firebase/auth'
import * as UserApi from '../firebase/user'

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
	const signin = async () => {
		try {
			await AuthApi.signout({ email, password })
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
	React.useEffect(() => {
		const unsub = AuthApi.onAuthStateChanged(async (user) => {
			if (user) {
				try {
					const userData = await UserApi.getUser(user.uid)
					console.log(userData);
					setUser(userData)
				} catch (error) {
					console.log('error auth')
				}
			} else {
				setUser(null)
			}
		})
		return () => {
			unsub()
		}
	}, [])

	const value = React.useMemo(() => {
		user, signup, signin, signout
	}, [user])

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const context = React.useContext(AuthContext)
	if (context === undefined) throw new Error('Auth Context not provided')
	return context
}
