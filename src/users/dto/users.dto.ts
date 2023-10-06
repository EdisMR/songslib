import { commonResponseDto } from "src/common/dto/common-response.dto";
import { userInterface } from "../entities/user.entity";

export class createUserResponseDto implements commonResponseDto {
	response_details: {
		execution_result: boolean;
		message: string;
		code: number;
		params: any;
	};
	data: Omit<userInterface, "password" | "private_id">;
}

export class getAllUserResponseDto implements commonResponseDto {
	response_details: {
		execution_result: boolean;
		message: string;
		code: number;
		params: any;
	};
	data: Omit<userInterface, "password" | "private_id">[];
}

export class getOneUserResponseDto implements commonResponseDto {
	response_details: {
		execution_result: boolean;
		message: string;
		code: number;
		params: any;
	};
	data: Omit<userInterface, "password" | "private_id">;
}

export class updateOneUserReqDto {
	username?: string;
	email?: string;
	new_password?: string;
	old_password?: string;
	password?: string;
}

export class updateOneUserRespDto implements commonResponseDto {
	response_details: {
		execution_result: boolean;
		message: string;
		code: number;
		params: any;
	};
	data: Omit<userInterface, "password" | "private_id">;
}