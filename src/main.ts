import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {

	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix("api");
	
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		})
	);

	await app.listen(envs.port || 3000);
	new Logger('AppModule').log( `Server running in port ${ envs.port || 3000 }` );
}
bootstrap();
