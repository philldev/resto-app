import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	setDoc,
	Timestamp,
	where,
} from '@firebase/firestore'
import db from './firestore'
import { createDocId } from './helper/createDocId'

const createOrderRef = (restoId) =>
	doc(db, 'restaurants', restoId, 'orders', createDocId())

const getOrderRef = (restoId, id) =>
	doc(db, 'restaurants', restoId, 'orders', id)

const orderCollection = (restoId) =>
	collection(db, 'restaurants', restoId, 'orders')

const getOrders = async (restoId, time = 'today') => {
	let q
	if (time === 'today') {
		const currDate = new Date() // get current date
		const yesterday = new Date(currDate.getDay() - 1)
		const tomorrow = new Date(currDate.getDay() + 1)
		q = query(
			orderCollection(restoId),
			where('createdAt', '>', yesterday),
			where('createdAt', '<', tomorrow)
		)
	} else if (time === 'this_week') {
		const currDate = new Date() // get current date
		const first = currDate.getDate() - currDate.getDay() // First day is the day of the month - the day of the week
		const last = first + 6 // last day is the first day + 6
		const firstday = new Date(currDate.setDate(first))
		const lastday = new Date(currDate.setDate(last))
		q = query(
			orderCollection(restoId),
			where('createdAt', '>=', firstday),
			where('createdAt', '<=', lastday)
		)
	} else if (time === 'this_month') {
		const currDate = new Date() // get current date
		const firstday = new Date(currDate.getFullYear(), currDate.getMonth(), 1)
		const lastday = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0)
		q = query(
			orderCollection(restoId),
			where('createdAt', '>=', firstday),
			where('createdAt', '<=', lastday)
		)
	}

	try {
		const orders = []
		const snap = await getDocs(q)
		snap.forEach((doc) => {
			orders.push(doc.data())
		})
		return orders
	} catch (error) {
		throw error
	}
}

const getOrderNumber = async (restoId) => {
	try {
		const q = query(orderCollection(restoId), orderBy('createdAt', 'desc'), limit(1))
		const snap = await getDocs(q)
		if (snap.empty) {
			return 0
		} else {
			const orderNumber = snap.docs[0].data().no
			return orderNumber + 1
		}
	} catch (error) {
		throw error
	}
}

const createOrder = async ({ restoId, order }) => {
	try {
		const orderRef =  createOrderRef(restoId)
		const orderNumber = await getOrderNumber(restoId)
		const data = {
			id: orderRef.id,
			...order,
			no : orderNumber,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		}
		await setDoc(orderRef, data)
		return data
	} catch (error) {
		throw error
	}
}

const updateOrder = async ({ restoId, order }) => {
	try {
		const orderRef = getOrderRef(restoId, order.id)
		await setDoc(orderRef, order, { merge: true })
		return order
	} catch (error) {
		throw error
	}
}

const deleteOrder = async ({ restoId, order }) => {
	try {
		const orderRef = getOrderRef(restoId, order.id)
		await deleteDoc(orderRef)
	} catch (error) {
		throw error
	}
}

export { getOrders, updateOrder, createOrder, deleteOrder }
