import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { envs } from './config';
import { TrucksModule } from './trucks/trucks.module';

@Module({
	imports: [
		UserModule,
		MongooseModule.forRoot(envs.mongoUrl),
		TrucksModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
