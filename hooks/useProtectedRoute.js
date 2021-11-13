import { route } from 'next/dist/server/router'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useAuth } from '../context/auth'

export default function useProtectedRoute() {
	const { user } = useAuth()
	const router = useRouter()
	React.useEffect(() => {
		if (user === null) {
			router.push('/login')
		}
		if (
			!user?.restaurantList &&
			!router.pathname.includes('/user/restaurants') &&
			!router.pathname.includes('/user')
		) {
			// TODO: push to restaurant list page
			router.push('/user/restaurants')
		}
	}, [user, router])

	return user
}
