import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { TurnaroundEvent } from 'src/turnarounds/entities/turnaround-event.entity';

@Global()
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub<{
        TURNAROUND_UPDATED: TurnaroundEvent;
      }>(),
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}
