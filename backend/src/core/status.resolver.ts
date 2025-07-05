import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class StatusResolver {
  @Query(() => String)
  status(): string {
    return 'Backend is running';
  }
}
