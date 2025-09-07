import { ConfigService } from "@nestjs/config/dist/config.service";
import type { JwtModuleOptions } from "@nestjs/jwt/dist/interfaces/jwt-module-options.interface";

export const getJwtConfig = async (config: ConfigService): Promise<JwtModuleOptions> => ({
	secret: config.getOrThrow<string>("JWT_SECRET"),
});
