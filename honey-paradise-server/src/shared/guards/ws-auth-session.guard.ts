import { isJWT } from "class-validator";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import type { CanActivate } from "@nestjs/common/interfaces/features/can-activate.interface";
import type { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import { WsException } from "@nestjs/websockets/errors/ws-exception";
import type { Socket } from "socket.io";

@Injectable()
export class WsSessionAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const client = context.switchToWs().getClient() as Socket;

		const token = client.handshake.auth.token;

		if (!token || !this.validateToken(token)) throw new WsException("Не авторизован");

		return true;
	}

	private validateToken(token: string): boolean {
		return isJWT(token);
	}
}
