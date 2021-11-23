import {
	collection,
	deleteDoc,
	doc,
	getDocs, query,
	setDoc
} from '@firebase/firestore'
import db from './firestore'
import { createDocId } from './helper/createDocId'

const createMenuCategoryRef = (restoId) =>
	doc(db, 'restaurants', restoId, 'menuCategories', createDocId())
const getMenuCategoryRef = (restoId, id) =>
	doc(db, 'restaurants', restoId, 'menuCategories', id)

const getMenuCategories = async (restoId) => {
	try {
		const q = query(collection(db, 'restaurants', restoId, 'menuCategories'))
		const menuCategories = []
		const snap = await getDocs(q)
		snap.forEach((doc) => {
			menuCategories.push(doc.data())
		})
		return menuCategories
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

