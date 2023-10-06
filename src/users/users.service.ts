import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createUserResponseDto, getAllUserResponseDto, getOneUserResponseDto, updateOneUserReqDto, updateOneUserRespDto } from './dto/users.dto';
import { ErrorReportingService } from 'src/common/services/error-reporting.service';
import { hashPassword, validatePassword } from 'src/common/services/auth-functions.service';
import { commonResponseDto } from 'src/common/dto/common-response.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly commonErrorResponse: ErrorReportingService,
  ) { }

  async create(): Promise<createUserResponseDto> {
    let response: createUserResponseDto = {} as createUserResponseDto;
    try {
      const user = await this.userRepository.create();
      let user2 = await this.userRepository.save(user);

      response.response_details = {
        execution_result: true,
        message: "User created successfully",
        code: 0,
        params: {},
      };

      delete user2.password;
      delete user2.private_id;

      response.data = user2;
      return response;

    } catch (error) {
      response = this.commonErrorResponse.commonErrorResponse(
        'Error creating user',
        {}
      );
      return response;
    }
  }

  async findAll(): Promise<getAllUserResponseDto> {
    let response: getAllUserResponseDto = {} as getAllUserResponseDto;
    try {
      response.response_details = {
        execution_result: true,
        message: "Users fetched successfully",
        code: 0,
        params: {},
      };
      response.data = await this.userRepository.find({
        select: [
          "public_id",
          "date_created",
          "date_updated",
          "username",
          "email"
        ],
      });
      return response;
    } catch (error) {
      response = this.commonErrorResponse.commonErrorResponse(
        'Error fetching users',
        {}
      );
      return response;
    }
  }

  async findOne(id: string): Promise<getOneUserResponseDto> {
    let response: getOneUserResponseDto = {} as getOneUserResponseDto;
    try {
      response.response_details = {
        execution_result: true,
        message: "User fetched successfully",
        code: 0,
        params: {},
      };
      let user = await this.userRepository.findOne({
        where: {
          public_id: id,
        },
      });
      delete user.password;
      delete user.private_id;
      response.data = user;
      return response;
    } catch (error) {
      if (id == "" || id == null || id == undefined) {
        response = this.commonErrorResponse.commonErrorResponse(
          'Parameter id is required',
          {}
        );
      } else {
        response = this.commonErrorResponse.commonErrorResponse(
          'Error fetching user',
          {}
        );
      }
      return response;
    }
  }

  async update(id: string, user: updateOneUserReqDto): Promise<updateOneUserRespDto> {
    let response: updateOneUserRespDto = {} as updateOneUserRespDto;
    try {
      response.response_details = {
        execution_result: true,
        message: "User updated successfully",
        code: 0,
        params: {},
      };

      let user2 = await this.userRepository.findOne({
        where: {
          public_id: id,
        }
      });
      if (user2 == undefined || user2 == null) {
        response = this.commonErrorResponse.commonErrorResponse(
          'User not found',
          {}
        );
        return response;
      }


      /* if password change */
      let requiredPasswordChange = false;
      if (user.new_password != undefined && user.new_password != null && user.new_password != "" && user.old_password != undefined && user.old_password != null && user.old_password != "") {
        /* compare passwords */
        let passwordCheck = await validatePassword({
          password: user.old_password,
          hash: user2.password
        });
        if (passwordCheck == false) {
          response = this.commonErrorResponse.commonErrorResponse(
            'Old password is incorrect',
            {}
          );
          return response;
        }
        requiredPasswordChange = true;
      }

      if (requiredPasswordChange == true) {
        /* hash new password */
        user.password = await hashPassword(user.new_password);
      }

      /* update user */
      await this.userRepository.update({
        public_id: id,
      }, user);

      delete user2.password;
      delete user2.private_id;
      response.data = user2;
      return response;
    } catch (error) {
      if (id == "" || id == null || id == undefined) {
        response = this.commonErrorResponse.commonErrorResponse(
          'Parameter id is required',
          {}
        );
      }
      response = this.commonErrorResponse.commonErrorResponse(
        'Error updating user',
        {}
      );
      return response;
    }
  }

  async remove(id: string):Promise<commonResponseDto> {
    let response: commonResponseDto = {} as commonResponseDto;
    try{
      response.response_details = {
        execution_result: true,
        message: "User deleted successfully",
        code: 0,
        params: {},
      };
      response.data = {};
      let execution = await this.userRepository.delete({
        public_id: id,
      });
      if(execution.affected == 0){
        response = this.commonErrorResponse.commonErrorResponse(
          'User not found',
          {}
        );
      }
      return response;
    } catch (error) {
      if (id == "" || id == null || id == undefined) {
        response = this.commonErrorResponse.commonErrorResponse(
          'Parameter id is required',
          {}
        );
      } else {
        response = this.commonErrorResponse.commonErrorResponse(
          'Error deleting user',
          {}
        );
      }
      return response;
    }
  }
}
