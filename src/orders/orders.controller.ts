import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/validate-token.guard';
import { LocationsService } from '../locations/locations.service';
import { TrucksService } from 'src/trucks/trucks.service';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserService } from 'src/user/user.service';
import { OrdersService } from './orders.service';
import { ParseMongoIdPipe } from '../common';

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

		let userFound: string = '';
		let truckFound: string = '';

		if (user)
			userFound = (await this.userService.findOne(user)).email;

		if (truck)
			truckFound = (await this.trucksSservice.findOne(truck)).user.email;

		if (user !== '' && truck !== '' && userFound !== truckFound)
			throw new BadRequestException({ message: 'Truck does not belong to the User' });

		if (pickup)
			await this.LocationsService.findOne(pickup);

		if (dropoff)
			await this.LocationsService.findOne(dropoff);
	}
}
