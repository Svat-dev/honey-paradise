import { ConfigService } from "@nestjs/config/dist/config.service";
import { JwtModuleOptions } from "@nestjs/jwt";

export const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => ({
	secret: configService.getOrThrow("JWT_SECRET"),
});
