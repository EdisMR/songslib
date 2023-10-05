
class ResponseDetailsDTO {
	execution_result: boolean;
	message: string;
	code: number;
	params: any; // Puedes añadir validaciones específicas para 'params' si es necesario
}

export class commonResponseDto {
	response_details: ResponseDetailsDTO;
	data: any;
}