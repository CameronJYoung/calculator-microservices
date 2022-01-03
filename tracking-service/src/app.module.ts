import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackerModule } from './tracker/tracker.module';
import { Calculation } from './tracker/calculation.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: '127.0.0.1',
			port: 3306,
			username: 'root',
			password: 'PASSWORD',
			database: 'test',
			entities: [Calculation],
			synchronize: true,
		}),
		TrackerModule],
  	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
