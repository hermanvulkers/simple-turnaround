import { Body, Controller, Post } from '@nestjs/common';
import { KafkaService } from '../core/kafka/kafka.service';

@Controller('turnarounds')
export class TurnaroundController {
  constructor(private kafkaService: KafkaService) {}

  @Post()
  async createEvent(@Body() body: any) {
    await this.kafkaService.send('turnaround-events', body);
    return { status: 'ok' };
  }
}
