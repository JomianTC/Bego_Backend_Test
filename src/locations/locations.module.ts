import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { Location, LocationSchema } from './entities/location.entity';
import { LocationsService } from './locations.service';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [
		UserModule,
		MongooseModule.forFeature([
			{ name: Location.name, schema: LocationSchema }
		]),
	],
	controllers: [LocationsController],
	providers: [LocationsService],
	exports: [MongooseModule],
})
export class LocationsModule { }
