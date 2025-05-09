import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/validate-token.guard';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { UserService } from '../user/user.service';
import { TrucksService } from './trucks.service';
import { ParseMongoIdPipe } from '../common';

@Controller('trucks')
export class TrucksController {

	constructor(
		private readonly trucksService: TrucksService,
		private readonly userService: UserService,
	) { }

	@Post('create')
	@UseGuards(AuthGuard)
	async create(@Body() createTruckDto: CreateTruckDto) {
		await this.userService.findOne(createTruckDto.user);
		return await this.trucksService.create(createTruckDto);
	}

	@Get('findAll')
	@UseGuards(AuthGuard)
	findAll() {
		return this.trucksService.findAll();
	}

	@Get('findOne/:id')
	@UseGuards(AuthGuard)
	findOne(@Param('id', ParseMongoIdPipe) id: string) {
		return this.trucksService.findOne(id);
	}

	@Get('findAll/user/:id')
	@UseGuards(AuthGuard)
	async findAllUserTrucks(@Param('id', ParseMongoIdPipe) id: string) {
		await this.userService.findOne(id);
		return await this.trucksService.findAllByUser(id);
	}

	@Patch('update/:id')
	@UseGuards(AuthGuard)
	async update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateTruckDto: UpdateTruckDto) {
		
		if(updateTruckDto.user)
			await this.userService.findOne(updateTruckDto.user);
	
		return await this.trucksService.update(id, updateTruckDto);
	}

	@Delete('delete/:id')
	@UseGuards(AuthGuard)
	remove(@Param('id', ParseMongoIdPipe) id: string) {
		return this.trucksService.remove(id);
	}
}
