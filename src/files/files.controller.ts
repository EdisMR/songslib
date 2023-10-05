import { Controller, Delete, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { environment } from 'src/environment/environment';
import { v4 as uuidv4 } from 'uuid';
import { FilesResDeleteDto, FilesResFilterErrorDto, FilesResUploadDto } from './files-response.dto';
import { FilesService } from './files.service';
const fileUploadPath = `${path.join(__dirname, environment.fileUploadPath)}`


export const storage = diskStorage({
	destination: (req, file, cb) => {
		cb(null, fileUploadPath)
	},
	filename: (req, file, cb) => {
		const extension: string = path.parse(file.originalname).ext
		const randomName = uuidv4() + '-' + uuidv4() + extension
		cb(null, randomName)
	}
})
export const fileFilter = (req, file, cb) => {

	/* *********************** */
	/* FILE PERMISSIONS DEFINITIONS */
	/* *********************** */
	let fileConditionsDeclaration = {
		fileExistance: false,
		fileSize: false,
		fileType: false
	}

	const fileTypesLimitsList = environment.fileTypeAllowed

	const fileSizeLimitsList = environment.fileSizeAllowed

	if (file && file.originalname && file.originalname.length > 0) {
		fileConditionsDeclaration.fileExistance = true
	}

	/* **************** */
	/* FILE TYPE VALIDATION */
	/* **************** */
	const fileExtension = path.parse(file.originalname).ext
	const fileMimeType = file.mimetype
	const isFileAllowed = fileTypesLimitsList.includes(fileMimeType) || fileTypesLimitsList.includes(fileExtension)

	if (isFileAllowed) {
		fileConditionsDeclaration.fileType = true
	}

	/* **************** */
	/* FILE SIZE VALIDATION */
	/* **************** */
	const fileSize = Number(parseInt(req.headers["content-length"]))
	if (isFileAllowed && fileSize > 0) {
		if (fileSize <= fileSizeLimitsList) {
			fileConditionsDeclaration.fileSize = true
		}
	}

	/* **************** */
	/* FINAL VALIDATION */
	/* **************** */
	if (
		fileConditionsDeclaration.fileExistance &&
		fileConditionsDeclaration.fileType &&
		fileConditionsDeclaration.fileSize
	) {
		cb(null, true)
	} else {
		let errorMessage = ''
		if (!fileConditionsDeclaration.fileExistance) {
			errorMessage += 'File not found. '
		}
		if (!fileConditionsDeclaration.fileType) {
			errorMessage = `File type not allowed. `
		}
		if (!fileConditionsDeclaration.fileSize && fileConditionsDeclaration.fileType) {
			errorMessage += `File size exceeded. `
		}

		let httpResponse: FilesResFilterErrorDto = {
			response_details: {
				code: 0,
				message: errorMessage,
				execution_result: false,
				params: {
					file: file.originalname,
				},
			},
			data: {
				filesize: fileSize,
				filetype: fileExtension
			},
		}
		/* response to client */
		cb(new HttpException(httpResponse, HttpStatus.BAD_REQUEST), false)
	}

}

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {
	}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file', { storage, fileFilter }))
	uploadFile(@UploadedFile() file): Promise<FilesResUploadDto> {
		return this.filesService.uploadFile(file);
	}

	@Delete('delete/:filename')
	async deleteFile(@Param('filename') filename: string): Promise<FilesResDeleteDto> {
		return this.filesService.remove(filename);
	}

}
