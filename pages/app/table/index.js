import { AppPage } from '../../../components/common/AppPage'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'

const Table = () => {
	return <AppPage displayHeader={false}></AppPage>
}

export default withProtectedRoute(Table)
