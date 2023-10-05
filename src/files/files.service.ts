import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { environment } from 'src/environment/environment';
import { FilesResDeleteDto, FilesResUploadDto } from './files-response.dto';

const fileUploadPath = `${path.join(__dirname, environment.fileUploadPath)}`


@Injectable()
export class FilesService {

  async uploadFile(
    data: {
      "fieldname": string
      "originalname": string
      "encoding": string
      "mimetype": string
      "destination": string
      "filename": string
      "path": string
      "size": number
    }
  ): Promise<FilesResUploadDto> {
    let response: FilesResUploadDto = {} as FilesResUploadDto

    if (!data) { //error case
      response = {
        response_details: {
          execution_result: false,
          message: "Error uploading file.",
          code: 0,
          params: {
            file: ''
          }
        },
        data: {
          mimetype: '',
          filename: '',
          fileSize: 0
        }
      }
      return response;
    }

    //success case
    response = {
      response_details: {
        code: 0,
        execution_result: true,
        message: 'File uploaded successfully',
        params: {
          file: data.originalname
        }
      },
      data: {
        mimetype: data.mimetype,
        filename: data.filename,
        fileSize: data.size
      }
    }
    return response;
  }

  async remove(filename: string): Promise<FilesResDeleteDto> {
    let response: FilesResDeleteDto = {} as FilesResDeleteDto
    if (!filename) {
      response = {
        response_details: {
          code: 0,
          execution_result: false,
          message: 'File not found. Please check request params',
          params: {
            file: filename
          }
        },
        data: {}
      };
      return response;
    }
    const filePath = path.join(fileUploadPath, filename);

    try {
      fs.unlinkSync(filePath);

      response = {
        response_details: {
          code: 0,
          execution_result: true,
          message: 'File deleted successfully',
          params: {
            file: filename
          }
        },
        data: {}
      };
      return response;
    } catch (error) {

      response = {
        response_details: {
          code: 0,
          execution_result: false,
          message: 'Error - File Was Not Deleted',
          params: {
            file: filename
          }
        },
        data: {}
      }

      if (error.code === 'ENOENT') {
        response = {
          response_details: {
            code: 0,
            execution_result: false,
            message: 'Error - File not found for deletion process',
            params: {
              file: filename
            }
          },
          data: {}
        }
      }

      return response;
    }
  }

}
