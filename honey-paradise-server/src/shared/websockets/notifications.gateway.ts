import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { WebSocketServer } from "@nestjs/websockets/decorators/gateway-server.decorator";
import { MessageBody } from "@nestjs/websockets/decorators/message-body.decorator";
import { WebSocketGateway } from "@nestjs/websockets/decorators/socket-gateway.decorator";
import { SubscribeMessage } from "@nestjs/websockets/decorators/subscribe-message.decorator";
import type { OnGatewayConnection } from "@nestjs/websockets/interfaces/hooks/on-gateway-connection.interface";
import type { OnGatewayDisconnect } from "@nestjs/websockets/interfaces/hooks/on-gateway-disconnect.interface";
import type { Server, Socket } from "socket.io";
import { WsAuthGuard } from "src/shared/guards/ws-auth.guard";
import { EnumWSPaths, EnumWSRoutes } from "src/shared/lib/common/constants";

@WebSocketGateway({
	path: EnumWSPaths.NOTIFICATIONS,
	cors: {
		origin: process.env.CLIENT_URL,
		credentials: true,
	},
})
@UseGuards(WsAuthGuard)
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() private server: Server;

	private roomId: string;

	async handleConnection(client: Socket) {
		this.roomId = client.handshake.auth["userId"];
		await client.join(this.roomId);
	}

	async handleDisconnect(client: Socket) {
		await client.leave(this.roomId);
	}

	@SubscribeMessage(EnumWSRoutes.NEW_NOTIFICATION)
	handleNewNotification(@MessageBody() payload: { userId: string; message: string; nid: string }) {
		this.server.to(payload.userId).emit(EnumWSRoutes.NEW_NOTIFICATION, {
			message: payload.message,
			nid: payload.nid,
			timestamp: new Date().toISOString(),
		});
	}
}
