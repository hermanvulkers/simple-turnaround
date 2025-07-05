import { Inject } from '@nestjs/common';
import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { TurnaroundEvent } from './entities/turnaround-event.entity';

@Resolver()
export class TurnaroundResolver {
  @Query(() => String)
  ping(): string {
    return 'pong';
  }

  @Subscription(() => TurnaroundEvent, { name: 'turnaroundUpdated' })
  turnaroundUpdated(): AsyncIterableIterator<TurnaroundEvent> {
    return this.pubSub.asyncIterableIterator('TURNAROUND_UPDATED');
  }

  constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub<{ TURNAROUND_UPDATED: TurnaroundEvent }>,
  ) {}
}
