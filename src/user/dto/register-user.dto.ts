import { IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator";

export class RegisterUserDto {

	@IsString({ message: 'Email must be a string' })
	@IsEmail({}, { message: 'Email is not valid' })
	email: string;

	@IsString({ message: 'Password must be a string' })
	@MinLength(8, { message: 'Password must contain 8 characters' })
	@IsStrongPassword(
		{
			minUppercase: 1,
			minLowercase: 1,
			minNumbers: 1,
			minSymbols: 1
		},
		{
			message: 'The password must contain lowercase, uppercase, number, and special character.'
		}
	)
	password: string;
}
