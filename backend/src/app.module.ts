import { Module } from '@nestjs/common';

import { TurnaroundModule } from './turnarounds/turnaround.module';

@Module({
  imports: [TurnaroundModule],
})
export class AppModule {}
