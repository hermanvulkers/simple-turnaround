import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Consumer, Kafka, Producer } from 'kafkajs';
import { TurnaroundEvent } from '../../turnarounds/entities/turnaround-event.entity';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka = new Kafka({
    clientId: 'turnaround-backend',
    brokers: [process.env.KAFKA_BROKER ?? 'localhost:9092'],
  });

  private readonly producer: Producer = this.kafka.producer();
  private readonly consumer: Consumer = this.kafka.consumer({
    groupId: 'frontend-group',
  });

  constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
  ) {}

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();

    await this.consumer.subscribe({
      topic: 'turnaround-events',
      fromBeginning: false,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const json = message.value?.toString();
        if (!json) return;

        const event: TurnaroundEvent = JSON.parse(json) as TurnaroundEvent;

        console.log('Received event in Kafka consumer:', event);

        await this.pubSub.publish('TURNAROUND_UPDATED', {
          turnaroundUpdated: event,
        });
      },
    });
  }

  async send(topic: string, message: object) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }
}
