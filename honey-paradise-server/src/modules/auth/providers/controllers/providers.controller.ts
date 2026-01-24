import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import {
  Get,
  Patch,
} from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SkipThrottle } from "@nestjs/throttler/dist/throttler.decorator";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { DeleteProviderDto } from "../dto/delete-provider.dto";
import { ProvidersService } from "../providers.service";
import { GetAllConnectionsResponse } from "../response/get-all-connections.res";

@ApiTags("Providers")
@Controller(EnumApiRoute.CONNECTIONS)
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @ApiOperation({
    summary:
      "Get all connections (providers) connected to current user. Authorized only",
  })
  @ApiOkResponse({ type: GetAllConnectionsResponse, isArray: true })
  @HttpCode(HttpStatus.OK)
  @Authorization()
  @SkipThrottle({ auth: true })
  @Get(EnumApiRoute.ALL_CONNECTIONS)
  getAllConnections(@Authorized("id") userId: string) {
    return this.providersService.getProvidersByUser(userId);
  }

  @ApiOperation({
    summary:
      "Disconnect connection (provider) from user account. Authorized only",
  })
  @ApiBody({ type: DeleteProviderDto })
  @ApiOkResponse({ type: Boolean, example: true })
  @HttpCode(HttpStatus.OK)
  @Authorization()
  @Patch(EnumApiRoute.DISCONNECT)
  disconnect(@Authorized("id") userId: string, @Body() dto: DeleteProviderDto) {
    return this.providersService.deleteUserProvider(userId, dto.pid);
  }
}
