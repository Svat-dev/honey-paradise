import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { EnumSpecialOfferAward } from "@prisma/client";
import { PrismaService } from "src/core/prisma/prisma.service";
import { specialOfferCartOutput } from "src/shared/lib/prisma/outputs/special-offers.output";

@Injectable()
export class SpecialOffersService {
  constructor(private readonly prisma: PrismaService) {}

  async countSpecialOffersDiscount(cartId: string) {
    const query = await this.prisma.specialOffer.findMany({
      where: {
        users: { some: { cart: { id: cartId } } },
        award: EnumSpecialOfferAward.DISCOUNT,
      },
      select: specialOfferCartOutput,
    });
  }
}
