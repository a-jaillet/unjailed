import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var cors = require('cors');
var helmet = require('helmet');
var csurf = require('csurf');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors())
  app.use(helmet());
  // app.use(csurf());

  await app.listen(3000);
}
bootstrap();
