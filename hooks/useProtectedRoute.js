import { useRouter } from 'next/router'
import * as React from 'react'
import { useAuth } from '../context/auth'
import { useUserResto } from '../context/Resto'

export default function useProtectedRoute() {
	const { user } = useAuth()
	const { restoList } = useUserResto()
	const router = useRouter()
	React.useEffect(() => {
		if (user === null) {
			router.push('/login')
		}
		if (
			restoList !== undefined &&
			(restoList.length > 0) &&
			!router.pathname.includes('/user/restaurants') &&
			!router.pathname.includes('/user')
		) {
			// TODO: push to restaurant list page
			router.push('/user/restaurants')
		}
	}, [user, router, restoList])

	return user
}
