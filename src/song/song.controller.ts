import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SongService } from './song.service';
import { songCreateRespDto, songGetAllRespDto, songGetOneRespDto, songPatchDataReqDto, songPatchDataRespDto } from './dto/songs-com.dto';
import { commonResponseDto } from 'src/common/dto/common-response.dto';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) { }

  @Post()
  create(): Promise<songCreateRespDto> {
    return this.songService.create();
  }

  @Get()
  findAll(): Promise<songGetAllRespDto> {
    return this.songService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<songGetOneRespDto> {
    return this.songService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: songPatchDataReqDto): Promise<songPatchDataRespDto> {
    return this.songService.update(id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<commonResponseDto> {
    return this.songService.remove(id);
  }
}
