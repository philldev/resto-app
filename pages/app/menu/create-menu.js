import { Input } from '@chakra-ui/input'
import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/layout'
import { Select, Textarea, Button } from '@chakra-ui/react'
import * as React from 'react'
import MainTopbar from '../../../components/app/MainTopbar'
import MainWrapper from '../../../components/app/MainWrapper'
import Sidebar from '../../../components/app/Sidebar'
import Page from '../../../components/common/Page'
import withProtectedRoute from '../../../components/hoc/withProtectedRoute'

function CreateMenu() {
	return (
		<Page>
			<Grid
				gridTemplateColumns='250px 1fr'
				w='100vw'
				h='100vh'
				overflow='hidden'
			>
				<Sidebar />
				<MainWrapper d='flex' flexDir='column' alignItems='center'>
					<MainTopbar />
					<Box p='4' maxW='container.lg' w='100%'>
						<Heading fontSize='2xl' mb='3'>
							Create Menu +
						</Heading>
						<Grid templateColumns='1fr 2fr' gap='4'>
							<Box>
								<Text mb='1' fontSize='sm'>
									Photo
								</Text>
								<Grid h='52' bg='gray.700' rounded='md' placeItems='center'>
									Upload photo +
								</Grid>
							</Box>
							<VStack alignItems='stretch' spacing='3'>
								<Box w='full'>
									<Text mb='1' fontSize='sm'>
										Name
									</Text>
									<Input
										w='full'
										bg='gray.700'
										border='none'
										placeholder='Enter menu name'
									/>
									<Text fontSize='sm' color='red.400' mt='2'></Text>
								</Box>
								<Box w='full'>
									<Text mb='1' fontSize='sm'>
										Price
									</Text>
									<Input
										w='full'
										bg='gray.700'
										border='none'
										placeholder='Enter menu price'
										type='number'
									/>
									<Text fontSize='sm' color='red.400' mt='2'></Text>
								</Box>
								<Box w='full'>
									<Text mb='1' fontSize='sm'>
										Category
									</Text>
									<Select placeholder='Select Category'>
										<option value='option1'>Option 1</option>
										<option value='option2'>Option 2</option>
										<option value='option3'>Option 3</option>
									</Select>
									<Text fontSize='sm' color='red.400' mt='2'></Text>
								</Box>
								<Box w='full'>
									<Text mb='1' fontSize='sm'>
										Tags
									</Text>
									<Textarea
										w='full'
										bg='gray.700'
										border='none'
										placeholder='Enter tags'
										resize='none'
									/>
									<Text fontSize='sm' color='red.400' mt='2'></Text>
								</Box>
								<Button>Create Menu</Button>
							</VStack>
						</Grid>
					</Box>
				</MainWrapper>
			</Grid>
		</Page>
	)
}

export default withProtectedRoute(CreateMenu)
