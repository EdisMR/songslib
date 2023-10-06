import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from './entities/song.entity';
import { ErrorReportingService } from 'src/common/services/error-reporting.service';

@Module({
  controllers: [SongController],
  providers: [
    SongService,
    ErrorReportingService
  ],
  imports: [
    TypeOrmModule.forFeature([
      SongEntity,
    ])
  ],
})
export class SongModule {}
