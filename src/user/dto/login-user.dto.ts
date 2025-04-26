import { IsString, IsEmail } from "class-validator";

export class LoginUserDto {

	@IsString({ message: 'Email must be a string' })
	@IsEmail({}, { message: 'Email is not valid' })
	email: string;

	@IsString({ message: 'Password must be a string' })
	password: string;
}
