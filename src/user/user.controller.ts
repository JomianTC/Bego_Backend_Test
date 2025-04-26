import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard, ParseMongoIdPipe } from '../common';

@Controller('user')
export class UserController {

	constructor(private readonly userService: UserService) { }

	// Auth endpoints

	@Post('register')
	registerUser(@Body() registerUserDto: RegisterUserDto) {
		return this.userService.registerUser(registerUserDto);
	}

	@Post('login')
	loginUser(@Body() loginUserDto: LoginUserDto) {
		return this.userService.loginUser(loginUserDto);
	}

	// CRUD User endpoints

	@Get('findAll')
	@UseGuards(AuthGuard)
	findAll() {
		return this.userService.findAll();
	}

	@Get('findOne/:id')
	@UseGuards(AuthGuard)
	findOne(@Param('id', ParseMongoIdPipe) id: string) {
		return this.userService.findOne(id);
	}

	@Patch('update/:id')
	@UseGuards(AuthGuard)
	update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}

	@Delete('delete/:id')
	@UseGuards(AuthGuard)
	remove(@Param('id', ParseMongoIdPipe) id: string) {
		return this.userService.remove(id);
	}
}
