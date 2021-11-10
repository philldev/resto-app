import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'

function Restaurant() {
	return <AppPage></AppPage>
}

export default withProtectedRoute(Restaurant)
