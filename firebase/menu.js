import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	onSnapshot,
	query,
	setDoc,
	where,
} from '@firebase/firestore'
import db from './firestore'
import { createDocId } from './helper/createDocId'

const createMenuRef = (restoId) =>
	doc(db, 'restaurants', restoId, 'menus', createDocId())

const getMenuRef = (restoId, id) => doc(db, 'restaurants', restoId, 'menus', id)

const menuCollection = (restoId) =>
	collection(db, 'restaurants', restoId, 'menus')

const getMenus = async (
	restoId,
	categoryId = 'all',
	{ listen = false, callback = (menus = []) => {} } = {}
) => {
	try {
		const q =
			categoryId === 'all'
				? query(menuCollection(restoId))
				: query(menuCollection(restoId), where('categoryId', '==', categoryId))
				
		if (listen) {
			const unsub = onSnapshot(q, (snap) => {
				const menus = []
				snap.forEach((doc) => {
					menus.push(doc.data())
				})
				callback(menus)
			})
			return unsub
		} else {
			const menus = []
			const snap = await getDocs(q)
			snap.forEach((doc) => {
				menus.push(doc.data())
			})
			return menus
		}
	} catch (error) {
		throw error
	}
}

const createMenu = async ({ restoId, menu }) => {
	try {
		const menuCatRef = createMenuRef(restoId)
		const data = {
			id: menuCatRef.id,
			...menu,
		}
		await setDoc(menuCatRef, data)
		return data
	} catch (error) {
		throw error
	}
}

const updateMenu = async ({ restoId, menu }) => {
	try {
		const menuCatRef = getMenuRef(restoId, menu.id)
		await setDoc(menuCatRef, menu, { merge: true })
		return menu
	} catch (error) {
		throw error
	}
}

const deleteMenu = async ({ restoId, menuCategory: menu }) => {
	try {
		const menuCatRef = getMenuRef(restoId, menu)
		await deleteDoc(menuCatRef)
	} catch (error) {
		throw error
	}
}

export { getMenus, deleteMenu, updateMenu, createMenu }
