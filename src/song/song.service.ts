import { Injectable } from '@nestjs/common';
import { songCreateRespDto, songGetAllRespDto, songGetOneRespDto, songPatchDataReqDto, songPatchDataRespDto } from './dto/songs-com.dto';
import { commonResponseDto } from 'src/common/dto/common-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SongEntity } from './entities/song.entity';
import { Repository } from 'typeorm';
import { ErrorReportingService } from 'src/common/services/error-reporting.service';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
    private readonly commonErrorResponse: ErrorReportingService
  ) { }

  async create(): Promise<songCreateRespDto> {
    let response: songCreateRespDto = {} as songCreateRespDto;
    try {
      let song = new SongEntity();
      await this.songRepository.save(song);

      response.response_details = {
        execution_result: true,
        message: 'Song created successfully',
        code: 0,
        params: {}
      }
      response.data = song;
      return response;
    } catch (e) {
      response = this.commonErrorResponse.commonErrorResponse(
        'Song creation failed',
        response
      );
      return response;
    }
  }

  async findAll(): Promise<songGetAllRespDto> {
    let response = {} as songGetAllRespDto;
    try {
      response.response_details = {
        execution_result: true,
        message: 'Songs fetched successfully',
        code: 0,
        params: {}
      }
      response.data = [];

      let songs = await this.songRepository.find();

      if (songs.length > 0) {
        songs.forEach(song => {
          delete song.private_id;
          response.data.push(song);
        });
      }
      return response;
    } catch (e) {
      response = this.commonErrorResponse.commonErrorResponse(
        'Songs fetch failed',
        response
      );
      return response;
    }
  }

  async findOne(idOrLinkString: string): Promise<songGetOneRespDto> {
    let response = {} as songGetOneRespDto;
    try {
      response.response_details = {
        execution_result: true,
        message: 'Song fetched successfully',
        code: 0,
        params: {
          identifier: idOrLinkString
        }
      }
      response.data = {} as SongEntity;

      let song = await this.songRepository.findOne({ where: [{ public_id: idOrLinkString }, { linkstring: idOrLinkString }] })

      if (song.public_id != null && song.public_id != "" && song.public_id != undefined) {
        delete song.private_id;
        response.data = song;
      } else {
        response.response_details.message = 'Song not found';
        response.response_details.execution_result = false;
      }

      return response;
    } catch (e) {
      if (idOrLinkString == null || idOrLinkString == "" || idOrLinkString == undefined) {
        response = this.commonErrorResponse.commonErrorResponse(
          'Song fetch failed. No identifier provided',
          { identifier: idOrLinkString }
        );
      }
      response = this.commonErrorResponse.commonErrorResponse(
        'Song fetch failed',
        { identifier: idOrLinkString }
      );
      return response;
    }
  }

  async update(id: string, updateSongDto: songPatchDataReqDto): Promise<songPatchDataRespDto> {
    let response = {} as songPatchDataRespDto;
    try {
      response.response_details = {
        execution_result: true,
        message: 'Song updated successfully',
        code: 0,
        params: {
          identifier: id
        }
      }
      response.data = {} as SongEntity;

      /* avoid private_id or public_id editing */
      updateSongDto.private_id ? delete updateSongDto.private_id : '';
      updateSongDto.public_id ? delete updateSongDto.public_id : '';

      let songToTupdate = await this.songRepository.update({ public_id: id }, updateSongDto);
      let songToSend
      if (songToTupdate.affected > 0) {
        songToSend = await this.songRepository.findOne({ where: { public_id: id } });
        delete songToSend.private_id;
        response.data = songToSend;
      } else {
        response.response_details.message = 'Song not found';
        response.response_details.execution_result = false;
      }

      return response;
    } catch (e) {
      if (id == null || id == "" || id == undefined || id == "undefined" || id == "null") {
        response = this.commonErrorResponse.commonErrorResponse(
          'Song update failed. No identifier provided',
          { identifier: id }
        );
      }
      response = this.commonErrorResponse.commonErrorResponse(
        'Song update failed',
        { identifier: id }
      );
      return response;
    }
  }

  async remove(id: string): Promise<commonResponseDto> {
    let response = {} as commonResponseDto;
    try {
      response.response_details = {
        execution_result: true,
        message: 'Song deleted successfully',
        code: 0,
        params: {
          identifier: id
        }
      }
      response.data = {};
      await this.songRepository.delete({ public_id: id });
      return response;
    } catch (e) {
      if (id == null || id == "" || id == undefined || id == "undefined" || id == "null") {
        response = this.commonErrorResponse.commonErrorResponse(
          'Song delete failed. No identifier provided',
          { identifier: id }
        );
      }
      response = this.commonErrorResponse.commonErrorResponse(
        'Song delete failed',
        { identifier: id }
      );
      return response;
    }
  }
}
