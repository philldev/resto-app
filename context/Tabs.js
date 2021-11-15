import * as React from 'react'

const TabsContext = React.createContext(null)

export const TabsProvider = ({ children }) => {
	const [tabIndex, setTabIndex] = React.useState(0)
	const [isSearching, setIsSearching] = React.useState(false)
	const [searchQuery, setSearchQuery] = React.useState('')
	const handleQueryChange = (e) => setSearchQuery(e.target.value)
	const handleTabsChange = (index) => setTabIndex(index)
	const toggleIsSearching = () => setIsSearching((p) => !p)

	React.useEffect(() => {
		if (isSearching) setTabIndex(0)
	}, [isSearching])

	const value = {
		tabIndex,
		handleTabsChange,
		isSearching,
		toggleIsSearching,
		handleQueryChange,
		searchQuery,
	}
	return (
		<TabsContext.Provider value={value}>
			{children}
		</TabsContext.Provider>
	)
}

export const useTabs = () => {
	const ctx = React.useContext(TabsContext)
	if (ctx === undefined) throw new Error('Context not provided')
	return ctx
}