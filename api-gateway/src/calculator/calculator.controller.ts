import { Body, Controller, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller('calculator')
export class CalculatorController {
	@Client({
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: 'calculator',
				brokers: ['localhost:9092']
			},
			consumer: {
				groupId: 'calculator-consumer'
			}
		}
	})
	client: ClientKafka;

	async onModuleInit() {
		this.client.subscribeToResponseOf('post.calculate.addition');

		await this.client.connect();
	}

	@Post('/addition')
	postCalculatorAddition(@Body() numbers: number[]) {
		console.log(numbers);
		return this.client.send('post.calculate.addition', numbers)
	}
}
