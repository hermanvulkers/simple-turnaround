import { Module } from '@nestjs/common';
import { SimulatorService } from 'src/core/kafka/simulator.service';
import { KafkaService } from '../core/kafka/kafka.service';
import { TurnaroundController } from './turnaround.controller';

@Module({
  controllers: [TurnaroundController],
  providers: [SimulatorService, KafkaService],
})
export class TurnaroundModule {}
