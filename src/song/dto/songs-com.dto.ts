import { commonResponseDto } from "src/common/dto/common-response.dto";
import { SongInterface } from "../entities/song.entity";

export class songCreateRespDto extends commonResponseDto {
	data: Omit<SongInterface, 'private_id'>;
}

export class songGetAllRespDto extends commonResponseDto {
	data: Omit<SongInterface, 'private_id'>[];
}

export class songGetOneRespDto extends commonResponseDto {
	data: Omit<SongInterface, 'private_id'>;
}


export class songPatchDataReqDto implements Partial<SongInterface>{
	private_id: string;
	public_id: string;
	date_created: Date;
	date_updated: Date;
	title: string;
	url: string;
	lyric: string;
	sources: string[];
	categories: string[];
	active: boolean;
}

export class songPatchDataRespDto extends commonResponseDto {
	data: Omit<SongInterface, 'private_id'>;
}