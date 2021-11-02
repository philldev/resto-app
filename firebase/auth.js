import { getAuth } from 'firebase/auth'
import firebaseApp from './app'

const auth = getAuth(firebaseApp)

const signup = async ({ email, password }) => {
	try {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		return userCredentials
	} catch (error) {
		throw error
	}
}

const signin = async ({ email, password }) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)
		return userCredential
	} catch (error) {
		throw error
	}
}

export { signin, signup }
