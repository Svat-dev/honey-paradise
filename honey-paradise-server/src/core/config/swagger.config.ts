import { DocumentBuilder } from "@nestjs/swagger/dist/document-builder";

export const getSwaggerConfig = () =>
  new DocumentBuilder()
    .setTitle("Honey Paradise")
    .setDescription("Honey Paradise API")
    .setVersion(process.env.npm_package_version ?? "1.0.0")
    .setBasePath("/")
    .build();
