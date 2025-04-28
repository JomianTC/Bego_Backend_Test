import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { BcryptAdapter, handleErrors } from '../common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		private readonly jwtService: JwtService
	) { }

	// Auth methods

	async registerUser(registerUserDto: RegisterUserDto) {

		const { email, password } = registerUserDto;

		try {

			const userFound = await this.userModel.findOne({ email });

			if (userFound)
				throw new BadRequestException({ message: 'User already exists' });

			const user = new this.userModel({
				email,
				password: BcryptAdapter.hash(password),
			});

			await user.save();

			return { message: 'User created successfully' };

		} catch (error) { handleErrors(error); }
	}

	async loginUser(loginUserDto: LoginUserDto) {

		const { email, password } = loginUserDto;

		try {

			const userFound = await this.userModel.findOne({ email });

			if (!userFound) throw new BadRequestException({ message: 'User not found' });

			const isPasswordValid = BcryptAdapter.compare(password, userFound.password);

			if (!isPasswordValid)
				throw new BadRequestException({ message: 'Invalid credentials' });

			return {
				message: 'Login successful',
				token: await this.signJwt(userFound.id)
			};

		} catch (error) { throw handleErrors(error); }
	}

	// CRUD User methods

	async findAll() {

		try {

			const users = await this.userModel.find().select('-password -__v').exec();

			if (!users.length) throw new BadRequestException({ message: 'No users found' });

			return users;

		} catch (error) { throw handleErrors(error); }
	}

	async findOne(id: string) {

		try {

			const userFound = await this.userModel.findById(id).select('-password -__v').exec();

			if (!userFound) throw new BadRequestException({ message: 'User not found' });

			return userFound;

		} catch (error) { throw handleErrors(error); }
	}

	async update(id: string, updateUserDto: UpdateUserDto) {

		const { email, password } = updateUserDto;

		try {

			await this.findOne(id);

			if (email) {

				const userFoundByEmail = await this.userModel.findOne({ email });
		
				if (userFoundByEmail)
					throw new BadRequestException({ message: 'Email already exists' });
			}

			if (password) {

				await this.userModel.findByIdAndUpdate(id, {
					...updateUserDto,
					password: BcryptAdapter.hash(password)
				}, { new: true });

				return { message: 'User updated successfully' };
			}

			await this.userModel.findByIdAndUpdate(id, { ...updateUserDto }, { new: true });

			return { message: 'User updated successfully' };

		} catch (error) { throw handleErrors(error); }
	}

	async remove(id: string) {

		try {

			await this.findOne(id);

			await this.userModel.findByIdAndDelete(id);

			return { message: 'User deleted successfully' };

		} catch (error) { throw handleErrors(error); }
	}

	// JWT methods
	async signJwt(payload: string) {
		return this.jwtService.sign({payload});
	}
}
