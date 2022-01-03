import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrackerService } from './tracker.service';
import { TrackerController } from './tracker.controller';
import { Calculation} from './calculation.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Calculation])],
  	providers: [TrackerService],
  	controllers: [TrackerController]
})
export class TrackerModule {}
