import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { envs } from './config';
import { TrucksModule } from './trucks/trucks.module';
import { LocationsModule } from './locations/locations.module';
import { OrdersModule } from './orders/orders.module';

@Module({
	imports: [
		UserModule,
		MongooseModule.forRoot(envs.mongoUrl),
		TrucksModule,
		LocationsModule,
		OrdersModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
