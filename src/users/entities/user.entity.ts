import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

export interface user {
	private_id: string;
	public_id: string;
	date_created: Date;
	date_updated: Date;
	username: string;
	password: string;
	email: string;
}

@Entity()
export class UserEntity {
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
	username: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@BeforeUpdate()
	updateTimestamp() {
		this.date_updated = new Date();
	}
}