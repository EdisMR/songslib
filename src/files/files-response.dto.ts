import { commonResponseDto } from "src/common/dto/common-response.dto";

export class FilesResUploadDto extends commonResponseDto {
	data: {
		mimetype: string;
		filename: string;
		fileSize: number;
	}
}


export class FilesResFilterErrorDto extends commonResponseDto {
	data: {
		filesize: number,
		filetype: string,
		fileConditionsDeclaration:any
	}
}


export class FilesResDeleteDto extends commonResponseDto {
	data: {}
}