import { Flex, Text } from "@chakra-ui/layout";
import { BackButton } from "../../../components/BackButton";
import withProtectedRoute from "../../../components/hoc/withProtectedRoute";

function Profile() {
	return (
		<Flex direction='column' w='100vw' h='100vh'>
				<Flex bg='gray.800' alignItems='center' p='4'>
					<Flex maxW='container.md' mx='auto' justifyContent='space-between' w='full' alignItems='center'>
						<Text fontSize='xl' fontWeight='bold'>
							Pengaturan Aplikasi
						</Text>
						<BackButton href='/app/more' />
					</Flex>
				</Flex>
		</Flex>
	)
}

export default withProtectedRoute(Profile)