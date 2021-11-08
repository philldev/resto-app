import { Button } from '@chakra-ui/button'
import {
	Badge,
	Box,
	Divider,
	Flex,
	Grid,
	Heading,
	Text,
} from '@chakra-ui/layout'
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat'
import {
	Table,
	TableCaption,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/table'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import * as React from 'react'
import OrderBar from '../../components/app/home/OrderBar'
import ProductList from '../../components/app/home/ProductList'
import MainTopbar from '../../components/app/MainTopbar'
import MainWrapper from '../../components/app/MainWrapper'
import RightBar from '../../components/app/RightBar'
import Sidebar from '../../components/app/Sidebar'
import Page from '../../components/common/Page'
import withProtectedRoute from '../../components/hoc/withProtectedRoute'

function App() {
	return (
		<Page>
			<Grid
				gridTemplateColumns='250px 1fr'
				w='100vw'
				h='100vh'
				overflow='hidden'
			>
				<Sidebar />
				<MainWrapper alignItems='center' d='flex' flexDir='column'>
					<MainTopbar />
					<Box maxW='container.md' w='100%' p='4'>
						<Grid templateColumns='1fr 1fr 1fr' mb='4' gap='2'>
							<Stat
								p='2'
								px='4'
								borderWidth='1px'
								borderColor='gray.600'
								rounded='md'
							>
								<StatLabel>Collected Fees</StatLabel>
								<StatNumber>£0.00</StatNumber>
								<StatHelpText>Feb 12 - Feb 28</StatHelpText>
							</Stat>
							<Stat
								p='2'
								px='4'
								borderWidth='1px'
								borderColor='gray.600'
								rounded='md'
							>
								<StatLabel>Collected Fees</StatLabel>
								<StatNumber>£0.00</StatNumber>
								<StatHelpText>Feb 12 - Feb 28</StatHelpText>
							</Stat>
							<Stat
								p='2'
								px='4'
								borderWidth='1px'
								borderColor='gray.600'
								rounded='md'
							>
								<StatLabel>Collected Fees</StatLabel>
								<StatNumber>£0.00</StatNumber>
								<StatHelpText>Feb 12 - Feb 28</StatHelpText>
							</Stat>
						</Grid>
						<Flex alignItems='center' mb='2' justifyContent='space-between'>
							<Heading fontSize='xl'>Today Orders</Heading>
							<Button colorScheme='teal' size='sm'>
								New Order
							</Button>
						</Flex>
						<Divider />
						<Table variant='simple'>
							<Thead>
								<Tr>
									<Th>No</Th>
									<Th>Items</Th>
									<Th>Table No</Th>
									<Th>Progress</Th>
									<Th>Totals</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td isNumeric>999</Td>
									<Td>Fried Rice ... (20 more)</Td>
									<Td isNumeric>10</Td>
									<Td>
										<Badge colorScheme='green'>Completed</Badge>
									</Td>
									<Td isNumeric>Rp 10K</Td>
								</Tr>
								<Tr>
									<Td isNumeric>999</Td>
									<Td>Fried Rice ... (20 more)</Td>
									<Td isNumeric>10</Td>
									<Td>
										<Badge colorScheme='green'>Completed</Badge>
									</Td>
									<Td isNumeric>Rp 10K</Td>
								</Tr>
								<Tr>
									<Td isNumeric>999</Td>
									<Td>Fried Rice ... (20 more)</Td>
									<Td isNumeric>10</Td>
									<Td>
										<Badge colorScheme='green'>Completed</Badge>
									</Td>
									<Td isNumeric>Rp 10K</Td>
								</Tr>
								<Tr>
									<Td isNumeric>999</Td>
									<Td>Fried Rice ... (20 more)</Td>
									<Td isNumeric>10</Td>
									<Td>
										<Badge colorScheme='green'>Completed</Badge>
									</Td>
									<Td isNumeric>Rp 10K</Td>
								</Tr>
								<Tr>
									<Td isNumeric>999</Td>
									<Td>Fried Rice ... (20 more)</Td>
									<Td isNumeric>10</Td>
									<Td>
										<Badge colorScheme='green'>Completed</Badge>
									</Td>
									<Td isNumeric>Rp 10K</Td>
								</Tr>
								<Tr>
									<Td isNumeric>999</Td>
									<Td>Fried Rice ... (20 more)</Td>
									<Td isNumeric>10</Td>
									<Td>
										<Badge colorScheme='green'>Completed</Badge>
									</Td>
									<Td isNumeric>Rp 10K</Td>
								</Tr>
								<Tr>
									<Td isNumeric>999</Td>
									<Td>Fried Rice ... (20 more)</Td>
									<Td isNumeric>10</Td>
									<Td>
										<Badge colorScheme='green'>Completed</Badge>
									</Td>
									<Td isNumeric>Rp 10K</Td>
								</Tr>
								<Tr>
									<Td isNumeric>999</Td>
									<Td>Fried Rice ... (20 more)</Td>
									<Td isNumeric>10</Td>
									<Td>
										<Badge colorScheme='green'>Completed</Badge>
									</Td>
									<Td isNumeric>Rp 10K</Td>
								</Tr>
								<Tr>
									<Td isNumeric>999</Td>
									<Td>Fried Rice ... (20 more)</Td>
									<Td isNumeric>10</Td>
									<Td>
										<Badge colorScheme='green'>Completed</Badge>
									</Td>
									<Td isNumeric>Rp 10K</Td>
								</Tr>
							</Tbody>
						</Table>
					</Box>
				</MainWrapper>
			</Grid>
		</Page>
	)
}

export default withProtectedRoute(App)
