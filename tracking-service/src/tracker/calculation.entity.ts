import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { operators } from './types/operators.enum'

@Entity()
export class Calculation {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	equationString: string;

	@Column()
	terms: string;

	@Column()
	operation: string;

	@Column()
	answer: number;

	@Column()
	dateRequested: string;
}