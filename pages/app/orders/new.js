import { IconButton } from '@chakra-ui/button'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/layout'
import { MenuIcon } from '../../../components/common/icons/MenuIcon'
import { MenuTabs } from '../../../components/MenuTabs'
import { MenuCategoryProvider } from '../../../context/MenuCategory'
import { MenusProvider } from '../../../context/Menus'
import { useUserResto } from '../../../context/Resto'
import { TabsProvider } from '../../../context/Tabs'

function NewOrder() {
	const { currentResto } = useUserResto()
	if (!currentResto) return null
	return (
		<Flex flexDir='column' w='100vw' h='100vh'>
			<Flex flex='1' flexDir='column' w='full' overflow='hidden'>
				<Flex alignItems='center' justifyContent='space-between' p='4' pb='2'>
					<Flex alignItems='center'>
						<MenuIcon mr='2' flex='1' w='6' h='6' />
						<Text fontSize='xl'>Order Baru</Text>
					</Flex>
					<IconButton variant='ghost' icon={<ArrowBackIcon w='6' h='6' />} />
				</Flex>
				<MenuCategoryProvider>
					<MenusProvider>
						<TabsProvider>
							<MenuTabs isOrdering />
						</TabsProvider>
					</MenusProvider>
				</MenuCategoryProvider>
			</Flex>
		</Flex>
	)
}

export default NewOrder
