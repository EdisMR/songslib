import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, Generated } from 'typeorm';

export interface userInterface {
	private_id: string;
	public_id: string;
	date_created: Date;
	date_updated: Date;
	username: string;
	password: string;
	email: string;
	active:boolean;
}

@Entity()
export class UserEntity {
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
	username: string;

	@Column({
		default: '',
	})
	password: string;

	@Column({
		default: '',
	})
	email: string;

	@Column({
		default: true,
	})
	active: boolean;

	@BeforeUpdate()
	updateTimestamp() {
		this.date_updated = new Date();
	}
}