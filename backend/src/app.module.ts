import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaService } from './kafka/kafka.service';
import { TurnaroundController } from './turnaround.controller';
import { WsGateway } from './websocket/websocket.gateway';

@Module({
  controllers: [AppController, TurnaroundController],
  providers: [AppService, KafkaService, WsGateway],
})
export class AppModule {}
