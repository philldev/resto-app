import {
	doc,
	getDocs,
	onSnapshot,
	query,
	setDoc,
	where,
} from '@firebase/firestore'
import db from './firestore'

const createRestoRef = () => doc(db, 'users', createDocId())

const createResto = async ({ resto, user }) => {
	try {
		const restoRef = createRestoRef()
		const restoData = {
			id: restoRef.id,
			...resto,
			userId: user.id,
		}
		await setDoc(restoRef, restoData)
	} catch (error) {
		throw error
	}
}

const getRestoList = async (
	userId,
	{ listen = false, callback = (restos = []) => {} } = {}
) => {
	try {
		const q = query(
			collection(db, 'restaurants'),
			where('userId', '==', userId)
		)
		if (listen) {
			const unsub = onSnapshot(q, (snap) => {
				const restos = []
				snap.forEach((doc) => {
					restos.push(doc.data())
				})
				callback(restos)
			})
			return unsub
		} else {
			const restos = []
			const snap = await getDocs(q)
			snap.forEach((doc) => {
				restos.push(doc.data())
			})
			return restos
		}
	} catch (error) {
		throw error
	}
}

export { createResto, getRestoList }
