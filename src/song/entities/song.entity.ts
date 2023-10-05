import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, Generated } from 'typeorm';

export interface SongInterface {
	private_id: string;
	public_id: string;
	date_created: Date;
	date_updated: Date;
	title: string;
	artist: string;
	tempo: number;
	linkstring: string;
	downloads: string[];
	audioFiles: string[];
	lyricRelatedId: string;
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
	artist: string;

	@Column({
		default: 0,
	})
	tempo: number;

	@Column({
		default: '',
	})
	linkstring: string;

	@Column({
		type: 'json',
		default: "[]",
		nullable: true,
	})
	downloads: string[];

	@Column({
		type: 'json',
		default: "[]",
		nullable: true,
	})
	audioFiles: string[];

	@BeforeUpdate()
	updateTimestamp() {
		this.date_updated = new Date();
	}
}