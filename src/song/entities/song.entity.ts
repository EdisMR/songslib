import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

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
	private_id: string;

	@PrimaryGeneratedColumn('uuid')
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

	@Column()
	title: string;

	@Column()
	artist: string;

	@Column()
	tempo: number;

	@Column()
	linkstring: string;

	@Column({
		type: 'json',
		default: [],
		nullable: false,
	})
	downloads: string[];

	@Column({
		type: 'json',
		default: [],
		nullable: false,
	})
	audioFiles: string[];

	@BeforeUpdate()
	updateTimestamp() {
		this.date_updated = new Date();
	}
}