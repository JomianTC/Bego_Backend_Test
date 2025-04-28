import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/validate-token.guard';
import { PlaceLocationDto } from './dto/place-location.dto';
import { LocationsService } from './locations.service';
import { ParseMongoIdPipe } from '../common';

@Controller('locations')
export class LocationsController {

	constructor(private readonly locationsService: LocationsService) { }

	@Post('create')
	@UseGuards(AuthGuard)
	create(@Body() placeLocationDto: PlaceLocationDto) {
		return this.locationsService.create(placeLocationDto);
	}

	@Get('findAll')
	@UseGuards(AuthGuard)
	findAll() {
		return this.locationsService.findAll();
	}

	@Get('findOne/:id')
	@UseGuards(AuthGuard)
	findOne(@Param('id', ParseMongoIdPipe) id: string) {
		return this.locationsService.findOne(id);
	}

	@Patch('update/:id')
	@UseGuards(AuthGuard)
	update(@Param('id', ParseMongoIdPipe) id: string, @Body() placeLocationDto: PlaceLocationDto) {
		return this.locationsService.update(id, placeLocationDto);
	}

	@Delete('delete/:id')
	@UseGuards(AuthGuard)
	remove(@Param('id', ParseMongoIdPipe) id: string) {
		return this.locationsService.remove(id);
	}
}
