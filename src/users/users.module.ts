import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ErrorReportingService } from 'src/common/services/error-reporting.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ErrorReportingService]
})
export class UsersModule {}
