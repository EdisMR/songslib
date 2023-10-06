import { commonResponseDto } from "src/common/dto/common-response.dto";
import { userInterface } from "../entities/user.entity";

export class createUserResponseDto extends commonResponseDto {
	data: Omit<userInterface, "password" | "private_id">;
}

export class getAllUserResponseDto extends commonResponseDto {
	data: Omit<userInterface, "password" | "private_id">[];
}

export class getOneUserResponseDto extends commonResponseDto {
	data: Omit<userInterface, "password" | "private_id">;
}

export class updateOneUserReqDto {
	username?: string;
	email?: string;
	new_password?: string;
	old_password?: string;
	password?: string;
}

export class updateOneUserRespDto extends commonResponseDto {
	data: Omit<userInterface, "password" | "private_id">;
}