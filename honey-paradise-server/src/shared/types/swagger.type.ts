import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"

export class ApiJsonValue {
	@ApiProperty({ type: "string", description: "", example: "Some text" })
	en: string

	@ApiProperty({ type: "string", description: "", example: "Текст" })
	ru: string
}
