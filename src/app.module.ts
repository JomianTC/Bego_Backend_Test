import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { envs } from './config';

@Module({
	imports: [
		UserModule,
		MongooseModule.forRoot(envs.mongoUrl)
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
