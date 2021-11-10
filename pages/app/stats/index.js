import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'

function Stats() {
	return <AppPage></AppPage>
}

export default withProtectedRoute(Stats)
