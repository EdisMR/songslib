import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SongModule } from './song/song.module';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from './environment/environment'; 
import { UserEntity } from './users/entities/user.entity';
import { SongLyricEntity } from './song/entities/songLyric.entity';
import { SongEntity } from './song/entities/song.entity';
@Module({
  imports: [
    UsersModule,
    SongModule,
    FilesModule,
    TypeOrmModule.forRoot({
      type: environment.database_type,
      host: environment.database_host,
      port: environment.database_port,
      username: environment.database_user,
      password: environment.database_password,
      database: environment.database_name,
      entities: [
        UserEntity,
        SongLyricEntity,
        SongEntity,
      ],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
