import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Truck, TruckSchema } from './entities/truck.entity';
import { TrucksController } from './trucks.controller';
import { TrucksService } from './trucks.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Truck.name, schema: TruckSchema },
		]),
	],
	controllers: [TrucksController],
	providers: [TrucksService],
	exports: [MongooseModule],
})
export class TrucksModule { }
