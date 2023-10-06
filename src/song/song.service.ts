import { Injectable } from '@nestjs/common';

@Injectable()
export class SongService {
  create(createSongDto) {
    return 'This action adds a new song';
  }

  findAll() {
    return `This action returns all song`;
  }

  findOne(id: string) {
    return `This action returns a #${id} song`;
  }

  update(id: string, updateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
