import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import type { CanActivate } from "@nestjs/common/interfaces/features/can-activate.interface";
import type { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import { WsException } from "@nestjs/websockets/errors/ws-exception";
import { isUUID } from "class-validator";
import type { Socket } from "socket.io";

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient() as Socket;

    const token = client.handshake.auth.userId;
    const session = client.handshake.auth.sid;

    if (!token || !session || !this.validateToken(token)) {
      throw new WsException("Не авторизован");
    }

    return true;
  }

  private validateToken(token: string): boolean {
    return isUUID(token, 4);
  }
}
