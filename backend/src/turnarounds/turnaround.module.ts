import { Module } from '@nestjs/common';
import { SimulatorService } from 'src/core/kafka/simulator.service';
import { KafkaService } from '../core/kafka/kafka.service';
import { TurnaroundController } from './turnaround.controller';
import { TurnaroundResolver } from './turnaround.resolver';

@Module({
  controllers: [TurnaroundController],
  providers: [TurnaroundResolver, SimulatorService, KafkaService],
})
export class TurnaroundModule {}
