import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProfileModule } from "../auth/profile/profile.module";

@Module({
	controllers: [ProductsController],
	providers: [ProductsService],
	imports: [ProfileModule],
	exports: [ProductsService],
})
export class ProductsModule {}
