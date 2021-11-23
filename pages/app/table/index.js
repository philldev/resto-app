import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'

function Table() {
	return <AppPage></AppPage>
}

export default withProtectedRoute(Table)
