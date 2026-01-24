import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator"
import { WebSocketServer } from "@nestjs/websockets/decorators/gateway-server.decorator"
import { MessageBody } from "@nestjs/websockets/decorators/message-body.decorator"
import { WebSocketGateway } from "@nestjs/websockets/decorators/socket-gateway.decorator"
import { SubscribeMessage } from "@nestjs/websockets/decorators/subscribe-message.decorator"
import type { OnGatewayConnection } from "@nestjs/websockets/interfaces/hooks/on-gateway-connection.interface"
import type { OnGatewayDisconnect } from "@nestjs/websockets/interfaces/hooks/on-gateway-disconnect.interface"
import type { Server, Socket } from "socket.io"
import { WsAuthGuard } from "src/shared/guards/ws-auth.guard"
import { EnumWSPaths, EnumWSRoutes } from "src/shared/lib/common/constants"

@WebSocketGateway({
	path: EnumWSPaths.NOTIFICATIONS,
	cors: {
		origin: process.env.CLIENT_URL,
		credentials: true
	}
})
@UseGuards(WsAuthGuard)
export class NotificationGateway
	implements OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() private server: Server

	private roomsByUser: Map<string, Set<string>> = new Map()

	async handleConnection(client: Socket) {
		const sid = client.handshake.auth["sid"]
		const userId = client.handshake.auth["userId"]

		if (!userId || !sid) return

		// Rejoin existing rooms for this user
		if (this.roomsByUser.has(userId)) {
			const rooms = this.roomsByUser.get(userId)!
			for (const room of rooms) await client.join(room)
		}

		// Join the user's room (userId)
		await client.join(userId)

		// Add the room to the map
		if (!this.roomsByUser.has(userId))
			this.roomsByUser.set(userId, new Set([userId]))
		else this.roomsByUser.get(userId)!.add(userId)

		// Join the session room (sid)
		await client.join(sid)

		return true
	}

	async handleDisconnect(client: Socket) {
		const userId = client.handshake.auth["userId"]

		if (userId && this.roomsByUser.has(userId)) {
			const rooms = this.roomsByUser.get(userId)!
			for (const room of rooms) await client.leave(room)
		}

		return true
	}

	@SubscribeMessage(EnumWSRoutes.NEW_NOTIFICATION)
	handleNewNotification(
		@MessageBody() payload: { userId: string; nid: string }
	) {
		this.server.to(payload.userId).emit(EnumWSRoutes.NEW_NOTIFICATION, {
			message: "notifications/refresh",
			nid: payload.nid,
			timestamp: new Date().toISOString()
		})

		return true
	}

	@SubscribeMessage(EnumWSRoutes.REMOVE_SESSION)
	handleRemoveSession(@MessageBody() payload: { sid: string }) {
		this.server.to(payload.sid).emit(EnumWSRoutes.REMOVE_SESSION, {
			message: "sessions/refresh",
			timestamp: new Date().toISOString()
		})

		this.server.in(payload.sid).disconnectSockets(true)

		return true
	}
}
