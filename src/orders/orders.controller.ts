import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard, ParseMongoIdPipe } from '../common';
import { OrdersService } from './orders.service';
import { UserService } from 'src/user/user.service';
import { TrucksService } from 'src/trucks/trucks.service';
import { LocationsService } from '../locations/locations.service';
import { Truck } from 'src/trucks/entities/truck.entity';
import { User } from 'src/user/entities/user.entity';

@Controller('orders')
export class OrdersController {

	constructor(
		private readonly ordersService: OrdersService,
		private readonly userService: UserService,
		private readonly trucksSservice: TrucksService,
		private readonly LocationsService: LocationsService,
	) { }

	@Post('create')
	@UseGuards(AuthGuard)
	async create(@Body() createOrderDto: CreateOrderDto) {

		await this.validateModels(
			createOrderDto.user,
			createOrderDto.truck,
			createOrderDto.pickup,
			createOrderDto.dropoff
		);
		return await this.ordersService.create(createOrderDto);
	}

	@Get('findAll')
	@UseGuards(AuthGuard)
	findAll() {
		return this.ordersService.findAll();
	}

	@Get('findOne/:id')
	@UseGuards(AuthGuard)
	findOne(@Param('id', ParseMongoIdPipe) id: string) {
		return this.ordersService.findOne(id);
	}

	@Patch('update/:id')
	@UseGuards(AuthGuard)
	async update(
		@Param('id', ParseMongoIdPipe) id: string,
		@Body() updateOrderDto: UpdateOrderDto
	) {

		await this.validateModels(
			updateOrderDto.user,
			updateOrderDto.truck,
			updateOrderDto.pickup,
			updateOrderDto.dropoff
		);

		return await this.ordersService.update(id, updateOrderDto);
	}

	@Delete('delete/:id')
	@UseGuards(AuthGuard)
	remove(@Param('id', ParseMongoIdPipe) id: string) {
		return this.ordersService.remove(id);
	}

	@Post('changeStatus/:id')
	@UseGuards(AuthGuard)
	changeStatus(@Param('id', ParseMongoIdPipe) id: string, @Body() changeStatusDto: ChangeStatusDto) {
		return this.ordersService.changeStatus(id, changeStatusDto);
	}

	async validateModels(user?: string, truck?: string, pickup?: string, dropoff?: string) {

		if (!user && !truck && !pickup && !dropoff) return;

		if (user)
			await this.userService.findOne(user);

		if (truck)
			await this.trucksSservice.findOne(truck);

		if (pickup)
			await this.LocationsService.findOne(pickup);

		if (dropoff)
			await this.LocationsService.findOne(dropoff);
	}
}
