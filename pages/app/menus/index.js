import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'

function Menus() {
	return <AppPage></AppPage>
}

export default withProtectedRoute(Menus)
