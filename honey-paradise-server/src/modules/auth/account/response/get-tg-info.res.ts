import { ApiProperty } from "@nestjs/swagger";
import type { IGetTelegramInfoResponse } from "../type";

export class GetTgInfoResponse implements IGetTelegramInfoResponse {
  @ApiProperty({ type: "boolean", description: "", example: true })
  connected: boolean;

  @ApiProperty({ type: "string", description: "", example: "74378274823" })
  tgId: string;

  @ApiProperty({ type: "string", description: "", example: "johndoe" })
  tgUsername: string;
}

export class ConnectTelegramResponse {
  @ApiProperty({
    type: "string",
    description: "",
    example: "https://t.me/johndoe",
  })
  url: string;
}
