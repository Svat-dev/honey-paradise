import { ApiProperty } from "@nestjs/swagger";
import { EnumProviderTypes, type Provider } from "@prisma/client";

export class GetAllConnectionsResponse implements Provider {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	id: string;

	@ApiProperty({ type: "string", description: "", example: "provider unique id" })
	providerId: string;

	@ApiProperty({ enum: EnumProviderTypes, description: "", example: EnumProviderTypes.GOOGLE })
	type: EnumProviderTypes;

	@ApiProperty({ type: "string", description: "", example: "user uuid" })
	userId: string;

	@ApiProperty({ description: "", example: new Date() })
	createdAt: Date;

	@ApiProperty({ description: "", example: new Date() })
	updatedAt: Date;
}
