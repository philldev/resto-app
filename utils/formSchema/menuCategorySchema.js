import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'

const MenuCategorySchema = yup
	.object({
		name: yup.string().required('Nama harus diisi!'),
	})
	.required()

const MenuCategoryResolver = yupResolver(MenuCategorySchema)

export { MenuCategoryResolver, MenuCategorySchema }
