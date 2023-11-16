import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, Generated, BeforeInsert } from 'typeorm';

export interface SongInterface {
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

@Entity()
export class SongEntity {
	@PrimaryGeneratedColumn('uuid')
	@Generated('uuid')
	private_id: string;

	@PrimaryGeneratedColumn('uuid')
	@Generated('uuid')
	public_id: string;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	date_created: Date;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	date_updated: Date;

	@Column({
		default: '',
	})
	title: string;

	@Column({
		default: '',
	})
	url: string;

	@Column({
		default: '',
		type:'longtext'
	})
	lyric: string;

	@Column({
		type: 'json',
		default: "[]",
		nullable: true,
	})
	sources: string[];

	@Column({
		type: 'json',
		default: "[]",
		nullable: true,
	})
	categories: string[];

	

	@Column({
		default: true,
	})
	active: boolean;

	@BeforeInsert()
	inserEasyLink() {
		let length: number = 4;
		const characterList: string = "1234567890bcdfghjklmnpqrstvwxyz";
		let result: string = ""
		while (length > 0) {
			var index: number = Math.floor(Math.random() * characterList.length);
			result += characterList[index];
			length--;
		}
		this.url = result.toUpperCase();
	}

	@BeforeUpdate()
	updateTimestamp() {
		this.date_updated = new Date();
	}
}