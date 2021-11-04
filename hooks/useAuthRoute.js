import { useRouter } from "next/router"
import * as React from 'react'
import { useAuth } from "../context/auth"

export default function useAuthRoute() {
	const { user } = useAuth()
	const router = useRouter()
	React.useEffect(() => {
		if (user) {
			router.push('/app')
		}
	}, [user, router])

	return user
}