import { Badge, Box, Heading } from '@chakra-ui/layout'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'

function TodayOrders() {
	return (
		<Box>
			<Heading fontSize='2xl' mb='2'>Today Orders</Heading>
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
	)
}

export default TodayOrders