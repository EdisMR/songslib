import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from './entities/song.entity';
import { SongLyricEntity } from './entities/songLyric.entity';

@Module({
  controllers: [SongController],
  providers: [SongService],
  imports: [
    TypeOrmModule.forFeature([
      SongEntity,
      SongLyricEntity
    ])
  ],
})
export class SongModule {}
