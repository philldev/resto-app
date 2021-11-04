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
	}, [user, router])

	return user
}
