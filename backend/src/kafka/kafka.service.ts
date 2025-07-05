import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';
import { WsGateway } from '../websocket/websocket.gateway';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka = new Kafka({
    clientId: 'turnaround-backend',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  });

  private producer: Producer = this.kafka.producer();
  private consumer: Consumer = this.kafka.consumer({
    groupId: 'frontend-group',
  });

  constructor(private gateway: WsGateway) {}

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'turnaround-events',
      fromBeginning: false,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const data = message.value?.toString();
        console.log('Received event:', data);

        if (data) {
          this.gateway.sendUpdateToClients(data);
        }
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
