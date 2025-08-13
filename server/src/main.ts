import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.HOST_PORT || 3000);
  Logger.log(
    `Application is running on: http://localhost:${
      process.env.HOST_PORT || 3000
    }`
  );
}

bootstrap();
