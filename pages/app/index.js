import { AppPage } from '../../components/common/AppPage'
import withProtectedRoute from '../../components/hoc/withProtectedRoute'

function App() {
	return <AppPage></AppPage>
}

export default withProtectedRoute(App)
