import { useRouter } from 'next/router'
import * as React from 'react'
import { useAuth } from '../context/auth'
import { useUserResto } from '../context/Resto'

export default function useProtectedRoute() {
	const { user } = useAuth()
	const { restoList, currentResto } = useUserResto()
	const router = useRouter()
	React.useEffect(() => {
		if (user === null) {
			router.push('/login')
		}
		if (
			(restoList?.length === 0 || currentResto === null) &&
			!router.pathname.includes('/app/choose-restaurant')
		) {
			router.push('/user/restaurants')
		}
	}, [user, router, restoList, currentResto])

	return user
}
