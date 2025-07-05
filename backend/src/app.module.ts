import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { PubSubModule } from './core/pubsub/pubsub.module';
import { TurnaroundModule } from './turnarounds/turnaround.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true, 
      },
    }),
    PubSubModule,
    TurnaroundModule,
  ],
})
export class AppModule {}
