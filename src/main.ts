import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app : NestExpressApplication  = await NestFactory.create(AppModule);
  // TYPE ORM
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  //SWAGGER
  const configOpenAPI = new DocumentBuilder()
    .setTitle('Clement Poueyto Portfolio API')
    .setDescription('Clement Poueyto Portfolio API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configOpenAPI);
  SwaggerModule.setup('api', app, document);


  await app.listen(port ?? 3000, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}
bootstrap();
