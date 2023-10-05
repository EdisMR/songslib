import { Injectable } from "@nestjs/common";
import { commonResponseDto } from "../dto/common-response.dto";

@Injectable()
export class ErrorReportingService {

	commonErrorResponse(
		message: string,
		params: any
	): commonResponseDto {
		return {
			response_details: {
				execution_result: false,
				message: message,
				code: 0,
				params: {
					...params
				}
			},
			data: {}
		}
	}

	commonNotFoundResponse(
		message: string,
		params: any
	): commonResponseDto {
		return {
			response_details: {
				execution_result: true,
				message: message,
				code: 0,
				params: {
					...params
				}
			},
			data: {}
		}
	}
}