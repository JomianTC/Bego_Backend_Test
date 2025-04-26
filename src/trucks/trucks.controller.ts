import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { TrucksService } from './trucks.service';
import { ParseMongoIdPipe, AuthGuard } from '../common';

@Controller('trucks')
export class TrucksController {

	constructor(
		private readonly trucksService: TrucksService,
	) { }

	@Post()
	@UseGuards(AuthGuard)
	async create(@Body() createTruckDto: CreateTruckDto) {
		return this.trucksService.create(createTruckDto);
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
	findAllUserTrucks(@Param('id', ParseMongoIdPipe) id: string) {
		return this.trucksService.findAllByUser(id);
	}

	@Patch('update/:id')
	@UseGuards(AuthGuard)
	update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateTruckDto: UpdateTruckDto) {
		return this.trucksService.update(id, updateTruckDto);
	}

	@Delete('delete/:id')
	@UseGuards(AuthGuard)
	remove(@Param('id', ParseMongoIdPipe) id: string) {
		return this.trucksService.remove(id);
	}
}
