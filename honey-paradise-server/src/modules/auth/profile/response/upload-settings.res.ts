import { ApiProperty } from "@nestjs/swagger";

export class UploadSettingsResponse {
  @ApiProperty({ type: "string", description: "", example: "john_doe" })
  username?: string | null;
}
