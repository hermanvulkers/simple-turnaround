import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TurnaroundEvent {
  @Field()
  flightId: string;

  @Field()
  type: string;

  @Field()
  timestamp: string;
}
