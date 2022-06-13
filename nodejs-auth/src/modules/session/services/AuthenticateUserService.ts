import User from "@modules/actor/model/User";
import UserRepository from "@modules/actor/repositories/UserRepository";
import authConfig from "@config/auth";
import { sign } from 'jsonwebtoken';
import { compare } from "bcryptjs";
import AppError from "@common/errors/app-error";
import { inject, injectable } from "tsyringe";
import RoleRepository from "@modules/access/repositories/RoleRepository";
import Role from "@modules/access/model/Role";

interface Request {
	email: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

@injectable()
class AuthenticateUserService {

	constructor(
		@inject('UserRepository')
		private userRepository: UserRepository,
		@inject('RoleRepository')
		private roleRepository: RoleRepository) { }


	public async execute({ email, password }: Request): Promise<Response> {

		const user = await this.userRepository.findByEmail(email as string);

		if (!user) {

			throw new Error('Incorrect email/password combination.');
		}

		let passwordMatched = false;
		let expiredDate = false;

		if (user.randomPasswordExpiresAt) {
			expiredDate = new Date(user.randomPasswordExpiresAt.toLocaleDateString('pt-br')) > new Date();
		}

		if (expiredDate && user.randomPassword) {
			throw new AppError('Senha randomica expirou.', 401);
		}

		if (!expiredDate && user.randomPassword) {
			passwordMatched = await compare(password, user.randomPassword as string);
		}

		if (!passwordMatched) {
			passwordMatched = await compare(password, user.password as string);
		}

		if (!passwordMatched) {
			throw new AppError('Combinação incorreta de e-mail/senha.', 400);
		}

		if (user.deactivatedAt || user.isActive == false) {
			throw new AppError('Usuário com acesso desabilitado. Solitice a habilitação de seu acesso.', 403);
		}

		if (user.confirmedUser == false) {
			throw new AppError('Verificação de email pendente.', 403);
		}

		for await (const role of user.roles) {

			role.permissions = [];

			const rolePermissions = await this.roleRepository.findById(role.id);

			if (rolePermissions && (rolePermissions as unknown as Role).permissions) {

				for (const permission of (rolePermissions as unknown as Role).permissions) {

					if (permission.isActive) {
						role.permissions.push(permission);
					}
				}
			}
		}

		let userName = user.firstName;
		if (user.lastName) {

			userName += ` ${user.lastName}`;
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign(
			{
				userName: userName
			},
			secret,
			{
				subject: user.id.toString(),
				expiresIn: expiresIn,
			}
		);

		return {
			user,
			token,
		}
	}
}

export default AuthenticateUserService;