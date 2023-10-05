import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

export interface SongLyricInterface {
	private_id: string;
	public_id: string;
	date_created: Date;
	date_updated: Date;
	lyric: string;
}

@Entity()
export class SongLyricEntity {
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

	@Column({
		type: 'longtext'
	})
	lyric: string;

	@BeforeUpdate()
	updateTimestamp() {
		this.date_updated = new Date();
	}
}