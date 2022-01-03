import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TrackerService } from './tracker.service';
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

interface ICalculationTrackerInput {
	terms: number[];
	operation: string;
	answer: number;
	dateRequested: number;
}

@Controller('tracker')
export class TrackerController {
	constructor(private trackerService: TrackerService) {}

	@MessagePattern('track.calculate.addition')
	trackCalculation(@Payload() data: IKafkaMessage<ICalculationTrackerInput>) {
		console.log('message recieved');
		
		this.trackerService.trackCalculation(data.value);
	}
}
