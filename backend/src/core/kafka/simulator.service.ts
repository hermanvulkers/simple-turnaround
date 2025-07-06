import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from './kafka.service';

const TURNAROUND_STEPS = [
  'Arrived',
  'Unloading',
  'Cleaning',
  'Refueling',
  'Catering',
  'Boarding',
  'Pushback',
];

@Injectable()
export class SimulatorService implements OnModuleInit {
  constructor(private kafkaService: KafkaService) {}

  onModuleInit() {
    this.startSimulation();
  }

  private startSimulation() {
    setInterval(() => {
      const flightId = this.randomFlightId();

      TURNAROUND_STEPS.forEach((step, index) => {
        setTimeout(() => {
          const event = {
            flightId,
            type: step,
            timestamp: new Date().toISOString(),
          };

          this.kafkaService
            .send('turnaround-events', event)
            .catch(console.error);
        }, index * 6000);
      });
    }, 60000);
  }

  private randomFlightId() {
    const airline = ['KL', 'HV', 'BA', 'LH'][Math.floor(Math.random() * 4)];
    const number = Math.floor(100 + Math.random() * 900);
    return `${airline}${number}`;
  }
}
