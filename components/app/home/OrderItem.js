import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";

export default function OrderItem() {
	return (
		<Box w='full'>
			<Box d='flex' mb='2'>
				<Box d='flex' flexGrow='1'>
					<Avatar src='' name='test' mr='2' />
					<Box>
						<Text>Spicy seasoned sea...</Text>
						<Text>$ 2.29</Text>
					</Box>
				</Box>
				<Box
					w='40px'
					h='40px'
					rounded='md'
					bg='gray.900'
					d='flex'
					alignItems='center'
					justifyContent='center'
					mr='4'
				>
					2
				</Box>
				<Box
					h='40px'
					w='40px'
					d='flex'
					alignItems='center'
					justifyContent='center'
				>
					$ 4,5
				</Box>
			</Box>
			<Box d='flex'>
				<Input placeholder='notes' mr='4' />
				<Button w='40px'>
					<DeleteIcon />
				</Button>
			</Box>
		</Box>
	)
}
