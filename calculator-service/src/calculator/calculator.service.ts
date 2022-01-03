import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
	addNumbers(data: number[]): number {
		console.log(data);
		
		return data.reduce((a, b) => {
			return a + b;
		})
	}
}
