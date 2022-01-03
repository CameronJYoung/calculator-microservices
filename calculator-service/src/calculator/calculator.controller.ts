import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Client, ClientKafka, Transport } from '@nestjs/microservices';
import { CalculatorService } from './calculator.service';
import { operators } from './types/operators.enum';

interface IKafkaMessage<T> {
    topic: string;
    partition: number;
    timestamp: string;
    size: number;
    attributes: number;
    offset: string;
    key: any;
    value: T;
    headers: Record<string, any>;
}

interface ICalculation {
	equationString: string;
	terms: number[];
	operation: operators;
	answer: number;
	dateRequested: number;
}

@Controller('calculator')
export class CalculatorController {
	constructor(private calculatorService: CalculatorService) {}

	@Client({
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
	})
	client: ClientKafka;

	async onModuleInit() {
		this.client.subscribeToResponseOf('track.calculate.addition');

		await this.client.connect();
	}

	@MessagePattern('post.calculate.addition')
	async postAddition(@Payload() data: IKafkaMessage<number[]>) {
		const answer = this.calculatorService.addNumbers(data.value);
		const operation = 'add';

		this.client.send('track.calculate.addition', {
			terms: data.value,
			operation: operation,
			answer: answer,
			dateRequested: Date.now()
		}).subscribe();
		
		return answer;
	}

}
