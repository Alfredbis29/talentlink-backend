import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('TalentLink API')
    .setDescription('The TalentLink Freelance Marketplace API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the server listening on all interfaces so it's reachable via 127.0.0.1 and Docker/container hosts.
  const port = 3000;
  await app.listen(port, '0.0.0.0');
  // getUrl may return an IPv6 loopback; print both common access URLs for clarity.
  console.log(`Application is running on: http://localhost:${port} and ${await app.getUrl()}`);
}
bootstrap();
