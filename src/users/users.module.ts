import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ErrorReportingService } from 'src/common/services/error-reporting.service';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ErrorReportingService
  ],
  imports:[
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ]
})
export class UsersModule { }
