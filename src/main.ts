import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

interface Error {
  error: string;
  message: string;
}

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: Error[]) {
    super();
  }
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse();
    console.log(exception.validationErrors.map((err) => err.message));
    //  err.message.split('-')
    return response.status(400).json({
      statusCode: 400,
      validationErrors: exception.validationErrors.map((err) => {
        return { error: err.error, message: err.message.split('-')[0] };
      }),
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const config = new DocumentBuilder()
    .setTitle('NestJS Passport-jwt')
    .setDescription('The NestJS Passport-jwt API description')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          return {
            error: `${error.property} has wrong value ${error.value}.`,
            message: Object.values(error.constraints).join('-'),
          };
        });
        return new ValidationException(messages);
      },
    }),
  );
  await app.listen(3002);
}
bootstrap();
