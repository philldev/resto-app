import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/table'

export const OrderItemsTable = ({ orderItems, total, tax, totalQty }) => {
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
			<Tfoot>
				<Tr>
					<Td borderColor='transparent'></Td>
					<Td borderColor='transparent' isNumeric>
						Total Qty
					</Td>
					<Td borderColor='transparent' isNumeric fontWeight='bold'>
						X {totalQty}
					</Td>
				</Tr>
				<Tr>
					<Td borderColor='transparent'></Td>
					<Td borderColor='transparent' isNumeric>
						Total Bayar
					</Td>
					<Td borderColor='transparent' isNumeric fontWeight='bold'>
						Rp {total}
					</Td>
				</Tr>
				{/* <Tr>
					<Td borderColor='transparent'></Td>
					<Td borderColor='transparent' isNumeric>
						Pajak {tax}%
					</Td>
					<Td borderColor='transparent' isNumeric fontWeight='bold'>
						Rp {(total * (tax / 100)).toFixed(2)}
					</Td>
				</Tr> */}
				{/* <Tr>
					<Td borderColor='transparent'></Td>
					<Td borderColor='transparent' isNumeric>
						Total Bayar
					</Td>
					<Td
						borderColor='transparent'
						isNumeric
						fontSize='md'
						fontWeight='bold'
					>
						Rp {total}
					</Td>
				</Tr> */}
			</Tfoot>
		</Table>
	)
}

const OrderDetailTableItem = ({ orderItem }) => {
	return (
		<Tr>
			<Td>{orderItem.name}</Td>
			<Td isNumeric>{orderItem.qty}</Td>
			<Td isNumeric>Rp {orderItem.price}</Td>
		</Tr>
	)
}
