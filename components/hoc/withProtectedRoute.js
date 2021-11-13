import { useUserResto } from '../../context/Resto'
import useProtectedRoute from '../../hooks/useProtectedRoute'
import LoaderPage from '../common/LoaderPage'

const withProtectedRoute = (Comp) => {
	return function ProtectedRoute() {
		const user = useProtectedRoute()
		const { initLoading, currentResto } = useUserResto()
		if (user === undefined || initLoading || currentResto === undefined)
			return <LoaderPage />
		if (!user) return null
		if (user) return <Comp />
	}
}

export default withProtectedRoute
