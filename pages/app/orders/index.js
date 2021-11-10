import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'

function Orders() {
	return <AppPage></AppPage>
}

export default withProtectedRoute(Orders)
