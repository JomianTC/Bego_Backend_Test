import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Order, OrderSchema } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UserModule } from 'src/user/user.module';
import { TrucksModule } from 'src/trucks/trucks.module';
import { LocationsModule } from 'src/locations/locations.module';
import { UserService } from 'src/user/user.service';
import { TrucksService } from 'src/trucks/trucks.service';
import { LocationsService } from 'src/locations/locations.service';

@Module({
	imports: [
		UserModule,
		TrucksModule,
		LocationsModule,
		MongooseModule.forFeature([
			{ name: Order.name, schema: OrderSchema },
		])
	],
	controllers: [OrdersController],
	providers: [OrdersService, UserService, TrucksService, LocationsService],
	exports: [MongooseModule],
})
export class OrdersModule { }
