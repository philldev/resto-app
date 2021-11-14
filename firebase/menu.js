import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	onSnapshot,
	query,
	setDoc,
} from '@firebase/firestore'
import db from './firestore'
import { createDocId } from './helper/createDocId'

const createMenuCategoryRef = (restoId) =>
	doc(db, 'restaurants', restoId, 'menuCategories', createDocId())
const getMenuCategoryRef = (restoId, id) =>
	doc(db, 'restaurants', restoId, 'menuCategories', id)
const createMenuRef = (restoId, categoryId) =>
	doc(
		db,
		'restaurants',
		restoId,
		'menuCategories',
		categoryId,
		'menus',
		createDocId()
	)
const getMenuRef = (restoId, categoryId, id) =>
	doc(db, 'restaurants', restoId, 'menuCategories', categoryId, 'menus', id)

const getMenuCategories = async (
	restoId,
	{ listen = false, callback = (menusCategories = []) => {} } = {}
) => {
	try {
		const q = query(collection(db, 'restaurants', restoId, 'menuCategories'))
		if (listen) {
			const unsub = onSnapshot(q, (snap) => {
				const menuCategories = []
				snap.forEach((doc) => {
					menuCategories.push(doc.data())
				})
				callback(menuCategories)
			})
			return unsub
		} else {
			const menuCategories = []
			const snap = await getDocs(q)
			snap.forEach((doc) => {
				menuCategories.push(doc.data())
			})
			return menuCategories
		}
	} catch (error) {
		throw error
	}
}

const createMenuCategory = async ({ restoId, menuCat }) => {
	try {
		const menuCatRef = createMenuCategoryRef(restoId)
		const data = {
			id: menuCatRef.id,
			...menuCat,
		}
		await setDoc(menuCatRef, data)
		return data
	} catch (error) {
		throw error
	}
}

const updateMenuCategory = async ({ restoId, menuCategory }) => {
	try {
		const menuCatRef = getMenuCategoryRef(restoId, menuCategory.id)
		await setDoc(menuCatRef, menuCategory, { merge: true })
		return menuCategory
	} catch (error) {
		throw error
	}
}

const deleteMenuCategory = async ({ restoId, menuCategory }) => {
	try {
		const menuCatRef = getMenuCategoryRef(restoId, menuCategory.id)
		await deleteDoc(menuCatRef)
	} catch (error) {
		throw error
	}
}

export {
	deleteMenuCategory,
	updateMenuCategory,
	createMenuCategory,
	getMenuCategories,
}
