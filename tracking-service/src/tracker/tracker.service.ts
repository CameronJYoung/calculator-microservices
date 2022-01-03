import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calculation } from './calculation.entity';
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

interface ICalculation {
	equationString: string;
	terms: number[];
	operation: operators;
	answer: number;
	dateRequested: number;
}

@Injectable()
export class TrackerService {
	constructor(
		@InjectRepository(Calculation)
		private calculationRepository: Repository<Calculation>
	) {}

	public parseCalculation(terms: number[], operation: string, answer: number): string {
		let calculation = '';
		terms.forEach((term) => {
			calculation += `${term} ${operation} `
		});
		const endingClip = operation.length + 1;
		calculation.slice(0, -endingClip)

		calculation += `= ${answer}`

		return calculation;
	}

	trackCalculation(data: ICalculationTrackerInput) {
		const equationString = this.parseCalculation(data.terms, data.operation, data.answer);
		const { terms, operation, answer, dateRequested } = data;
		console.log(data);
		
		return this.calculationRepository.save({
			terms: terms.toString(),
			operation: operation,
			answer: answer,
			dateRequested: dateRequested.toString(),
			equationString: equationString
		})
		
	}
}
