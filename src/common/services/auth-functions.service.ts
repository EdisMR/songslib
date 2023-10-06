import { compare, genSalt, hash } from "bcryptjs";

export function createToken(howMany?:number):string {
	let length:number = howMany || 20;
	const characterList:string = "0123456789bcdfghjklmnpqrstvwxyz";
	let result:string = ""
	while (length > 0) {
		var index:number = Math.floor(Math.random() * characterList.length);
		result += characterList[index];
		length--;
	}
	return result.toUpperCase();
}

export async function validatePassword(data:{
	password: string,
	hash: string,
}): Promise<boolean> {
	const result = await compare(data.password, data.hash);
	return result
}

export async function hashPassword(pass:string): Promise<string> {
	const salt = await genSalt(10);
	const hashedPass = await hash(pass, salt);
	return hashedPass
}