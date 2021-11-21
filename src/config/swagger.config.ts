import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (path: string, app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('URL Shortener: API')
    .setDescription('Swagger documentation')
    .setVersion('1.0')
    .build();

  SwaggerModule.setup(path, app, SwaggerModule.createDocument(app, config));
};
