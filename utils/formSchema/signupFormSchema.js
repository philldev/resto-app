import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

const SignupSchema = yup
	.object({
		email: yup.string().required('Email is required').email('Email is invalid'),
		password: yup
			.string()
			.required('Password is required')
			.min(6, 'Password must be longer than 6 characters'),
	})
	.required()

const signupResolver = yupResolver(SignupSchema)

export { SignupSchema, signupResolver }
