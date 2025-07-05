import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventSimulatorService } from './kafka/event-simulator.service';
import { KafkaService } from './kafka/kafka.service';
import { TurnaroundController } from './turnarounds/turnaround.controller';
import { WsGateway } from './websocket/websocket.gateway';

@Module({
  controllers: [AppController, TurnaroundController],
  providers: [AppService, KafkaService, WsGateway, EventSimulatorService],
})
export class AppModule {}
