import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  );
  const config = new DocumentBuilder()
    .setTitle("TaskRhythm API")
    .setDescription("API documentation for TaskRhythm")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("apis", app, document);

  await app.listen(process.env.HOST_PORT || 3000);
  Logger.log("TaskRhythm server is running...");
  Logger.log(
    `Application is running on: http://localhost:${
      process.env.HOST_PORT || 3000
    }`
  );
}

bootstrap();
