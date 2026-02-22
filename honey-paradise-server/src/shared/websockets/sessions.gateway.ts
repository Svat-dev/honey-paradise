import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator"
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception"
import { JwtService } from "@nestjs/jwt/dist/jwt.service"
import { MessageBody, SubscribeMessage } from "@nestjs/websockets"
import { WebSocketServer } from "@nestjs/websockets/decorators/gateway-server.decorator"
import { WebSocketGateway } from "@nestjs/websockets/decorators/socket-gateway.decorator"
import type { OnGatewayConnection } from "@nestjs/websockets/interfaces/hooks/on-gateway-connection.interface"
import type { OnGatewayDisconnect } from "@nestjs/websockets/interfaces/hooks/on-gateway-disconnect.interface"
import { isUUID } from "class-validator"
import type { Server, Socket } from "socket.io"

import { WsSessionAuthGuard } from "../guards/ws-auth-session.guard"
import { EnumWSPaths, EnumWSRoutes } from "../lib/common/constants"

@WebSocketGateway({
	path: EnumWSPaths.SESSIONS,
	cors: {
		origin: process.env.CLIENT_URL,
		credentials: true
	}
})
@UseGuards(WsSessionAuthGuard)
export class SessionsGateway
	implements OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() private server: Server

	constructor(private readonly jwtService: JwtService) {}

	async handleConnection(client: Socket) {
		try {
			const token = await client.handshake.auth.token
			const payload = token
				? this.jwtService.verify<{ room: string; token: string }>(token)
				: null

			if (payload?.room) await client.join(payload.room)

			return true
		} catch (error) {
			throw new BadRequestException("Invalid Jwt token!")
		}
	}

	async handleDisconnect(client: Socket) {
		const token = await client.handshake.auth.token
		const payload = token
			? this.jwtService.verify<{ room: string; token: string }>(token)
			: null

		if (payload?.room) await client.leave(payload.room)

		return true
	}

	handleDisconnectRoom(roomId: string) {
		if (this.server.sockets.adapter.rooms.has(roomId)) {
			this.server.in(roomId).disconnectSockets(true)
		}
	}

	@SubscribeMessage(EnumWSRoutes.TG_ACCEPTED)
	handleAcceptTgLogin(@MessageBody() payload: { token: string; room: string }) {
		if (!payload.token || !isUUID(payload.token, 4)) {
			this.server.to(payload.room).emit(EnumWSRoutes.TG_ACCEPTED, {
				error: true,
				message: "Неправильный токен входа!"
			})

			return false
		}

		this.server
			.to(payload.room)
			.emit(EnumWSRoutes.TG_ACCEPTED, { token: payload.token })

		return true
	}

	@SubscribeMessage(EnumWSRoutes.TG_REJECTED)
	handleRejectTgLogin(@MessageBody() payload: { room: string }) {
		this.server.to(payload.room).emit(EnumWSRoutes.TG_REJECTED, {
			error: true,
			message: "Ваш запрос на вход был отклонен!"
		})

		this.server.in(payload.room).disconnectSockets(true)

		return true
	}

	@SubscribeMessage(EnumWSRoutes.TG_CODE_LIFETIME_EXPIRED)
	handleCodeLifetimeExpired(@MessageBody() payload: { jwt_token: string }) {
		const token_payload = this.jwtService.verify<{
			room: string
			token: string
		}>(payload.jwt_token)

		this.server
			.to(token_payload.room)
			.emit(EnumWSRoutes.TG_CODE_LIFETIME_EXPIRED, {
				error: true,
				message: "Ваше время входа закончилось!"
			})

		this.server.in(token_payload.room).disconnectSockets(true)

		return true
	}
}
