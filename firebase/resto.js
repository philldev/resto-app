import {
	collection,
	doc,
	getDocs,
	onSnapshot,
	query,
	setDoc,
	where,
} from '@firebase/firestore'
import db from './firestore'
import { createDocId } from './helper/createDocId'

const createRestoRef = () => doc(db, 'restaurants', createDocId())
const getRestoRef = (id) => doc(db, 'restaurants', id)

const createResto = async ({ resto, user }) => {
	try {
		const restoRef = createRestoRef()
		const restoData = {
			...resto,
			id: restoRef.id,
			userId: user.id,
		}
		await setDoc(restoRef, restoData)
		return restoData
	} catch (error) {
		throw error
	}
}

const updateResto = async ({ restoId, updatedResto }) => {
	try {
		const restoRef = getRestoRef(restoId)
		await setDoc(restoRef, updatedResto, { merge: true })
		return updatedResto
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

export { createResto, getRestoList, updateResto }
