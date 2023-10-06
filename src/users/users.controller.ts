import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserResponseDto, getAllUserResponseDto, updateOneUserReqDto, updateOneUserRespDto } from './dto/users.dto';
import { commonResponseDto } from 'src/common/dto/common-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(): Promise<createUserResponseDto> {
    return this.usersService.create();
  }

  @Get()
  findAll(): Promise<getAllUserResponseDto> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: updateOneUserReqDto): Promise<updateOneUserRespDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<commonResponseDto> {
    return this.usersService.remove(id);
  }
}
