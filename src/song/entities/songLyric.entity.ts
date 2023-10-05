import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, Generated, OneToOne } from 'typeorm';
import { SongEntity } from './song.entity';

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

	@OneToOne(
		() => SongEntity,
		(song:SongEntity) => song.lyricRelatedId,
	)
	lyric: string;

	@BeforeUpdate()
	updateTimestamp() {
		this.date_updated = new Date();
	}
}