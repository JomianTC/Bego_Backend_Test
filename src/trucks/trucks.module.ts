import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Truck, TruckSchema } from './entities/truck.entity';
import { TrucksController } from './trucks.controller';
import { UserService } from '../user/user.service';
import { TrucksService } from './trucks.service';
import { UserModule } from '../user/user.module';

@Module({
	imports: [
		UserModule,
		MongooseModule.forFeature([
			{ name: Truck.name, schema: TruckSchema },
		]),
	],
	controllers: [TrucksController],
	providers: [TrucksService,UserService],
	exports: [MongooseModule],
})
export class TrucksModule { }
