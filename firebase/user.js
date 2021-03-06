import { doc, getDoc, onSnapshot, setDoc } from '@firebase/firestore'
import db from './firestore'

// const userCollection = collection(db, 'users')

// const createUsersRef = () => doc(db, 'users', createDocId())

const getUserRef = (id) => doc(db, 'users', id)

const createUser = async ({ email, password, uid }) => {
	try {
		const userRef = getUserRef(uid)
		const userData = {
			id: userRef.id,
			email,
			password,
		}
		await setDoc(userRef, userData)
		return userData
	} catch (error) {
		throw error
	}
}

// TODO: Get a User
const getUser = async (id, { listen = false, callback = () => {} } = {}) => {
	try {
		if (listen) {
			const unsub = onSnapshot(getUserRef(id), (doc) => {
				return callback(doc.data())
			})
			return unsub
		} else {
			const userRef = getUserRef(id)
			const userSnap = await getDoc(userRef)
			const userData = userSnap.data()
			return userData
		}
	} catch (error) {
		throw error
	}
}

// TODO: Update User

// TODO: Delete User

export { createUser, getUser }

