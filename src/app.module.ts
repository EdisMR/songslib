import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SongModule } from './song/song.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from './environment/environment'; 
import { UserEntity } from './users/entities/user.entity';
import { SongEntity } from './song/entities/song.entity';
import { CommonUtilitiesModule } from './common/common.module';
import { AppController } from './app.controller';
@Module({
  imports: [
    UsersModule,
    SongModule,
    TypeOrmModule.forRoot({
      type: environment.database_type,
      host: environment.database_host,
      port: environment.database_port,
      username: environment.database_user,
      password: environment.database_password,
      database: environment.database_name,
      entities: [
        UserEntity,
        SongEntity,
      ],
      synchronize: true,
      dropSchema: true,
    }),
    CommonUtilitiesModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
