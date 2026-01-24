import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProfileModule } from "../auth/profile/profile.module";
import { ProductsController } from "./products.controller";
import { FavoritesProductsService } from "./services/favorites-products.service";
import { ProductsService } from "./services/products.service";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, FavoritesProductsService],
  imports: [ProfileModule],
  exports: [ProductsService, FavoritesProductsService],
})
export class ProductsModule {}
