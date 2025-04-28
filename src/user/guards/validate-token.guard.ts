
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { envs } from 'src/config';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token)
			throw new UnauthorizedException({ message: 'Token is required' });

		try {

			const { payload } = await this.jwtService.verify(token, 
				{ secret: envs.jwtSecret });

			await this.userService.findOne(payload);

			return true;

		} catch (error) { throw new UnauthorizedException({ message: 'Invalid Token' }); }
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
