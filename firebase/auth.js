import {
	getAuth,
	onAuthStateChanged as fbOnAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'
import firebaseApp from './app'

export const fbAuth = getAuth(firebaseApp)

const signup = async ({ email, password }) => {
	try {
		const userCredentials = await createUserWithEmailAndPassword(
			fbAuth,
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
			fbAuth,
			email,
			password
		)
		return userCredential
	} catch (error) {
		throw error
	}
}

const signout = async () => {
	try {
		await signOut()
	} catch (error) {
		throw error
	}
}

export { signin, signup,  signout }
