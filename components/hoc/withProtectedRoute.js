import { useUserResto } from '../../context/Resto'
import useProtectedRoute from '../../hooks/useProtectedRoute'
import LoaderPage from '../common/LoaderPage'

const withProtectedRoute = (Comp) => {
	return function ProtectedRoute() {
		const user = useProtectedRoute()
		const { initLoading } = useUserResto()
		if (user === undefined || initLoading)
			return <LoaderPage />
		if (!user) return null
		if (user) return <Comp />
	}
}

export default withProtectedRoute
