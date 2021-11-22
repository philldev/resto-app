import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { formatPrice } from '../utils/formatPrice'

export const OrderItemsTable = ({ orderItems }) => {
	return (
		<Table size='sm' variant='simple'>
			<Thead>
				<Tr>
					<Th>Nama</Th>
					<Th isNumeric>Qty</Th>
					<Th isNumeric w='40%'>
						Harga
					</Th>
				</Tr>
			</Thead>
			<Tbody>
				{orderItems.map((item, index) => (
					<OrderDetailTableItem orderItem={item} key={index} />
				))}
			</Tbody>
		</Table>
	)
}

const OrderDetailTableItem = ({ orderItem }) => {
	return (
		<Tr>
			<Td>{orderItem.name}</Td>
			<Td isNumeric>{orderItem.qty}</Td>
			<Td isNumeric>{formatPrice(orderItem.price)}</Td>
		</Tr>
	)
}
