import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: 'tracking-service',
				brokers: ['localhost:9092']
			},
			consumer: {
				groupId: 'tracking-consumer'
			}
		}
	});
  	
	app.listen();
}
bootstrap();
