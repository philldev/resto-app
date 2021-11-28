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
	getDoc,
} from '@firebase/firestore'
import db from './firestore'
import { createDocId } from './helper/createDocId'

const createOrderRef = (restoId) =>
	doc(db, 'restaurants', restoId, 'orders', createDocId())

const getOrderRef = (restoId, id) =>
	doc(db, 'restaurants', restoId, 'orders', id)

const orderCollection = (restoId) =>
	collection(db, 'restaurants', restoId, 'orders')

const getOrder = async (restoId, id) => {
	try {
		const orderRef = getOrderRef(restoId, id)
		const snap = await getDoc(orderRef)
		if (snap.exists()) return snap.data()
		return null
	} catch (error) {
		throw error
	}
}

const getOrders = async (restoId, status, itemsLimit = 999) => {
	try {
		const orders = []
		const snap = await getDocs(
			query(
				orderCollection(restoId),
				where('status', '==', status),
				limit(itemsLimit),
				orderBy('createdAt', 'desc')
			)
		)
		snap.forEach((doc) => {
			orders.push(doc.data())
		})
		return orders
	} catch (error) {
		throw error
	}
}

const getRangeOfOrders = async (restoId, status, startDate, endDate) => {
	try {
		const orders = []
		const snap = await getDocs(
			query(
				orderCollection(restoId),
				where('createdAt', '>=', startDate),
				where('createdAt', '<=', endDate),
				where('status', '==', status)
			)
		)
		snap.forEach((doc) => {
			orders.push(doc.data())
		})
		return orders
	} catch (error) {
		console.log(error)
		throw error
	}
}

const getOrderNumber = async (restoId) => {
	try {
		const q = query(
			orderCollection(restoId),
			orderBy('createdAt', 'desc'),
			limit(1)
		)
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
		const orderRef = createOrderRef(restoId)
		const orderNumber = await getOrderNumber(restoId)
		const data = {
			id: orderRef.id,
			...order,
			no: orderNumber,
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

export {
	getOrders,
	getRangeOfOrders,
	updateOrder,
	createOrder,
	deleteOrder,
	getOrder,
}
