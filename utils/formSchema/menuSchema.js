import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'

const MenuSchema = yup
	.object({
		name: yup.string().required('Nama harus diisi!'),
		price: yup.string().required('Harga harus diisi!'),
		categoryId: yup.string().required('Pilih kategori menu!'),
		imageURL : yup.string()
	})
	.required()

const MenuResolver = yupResolver(MenuSchema)

export { MenuResolver , MenuSchema }
