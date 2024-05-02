import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seederService = app.get<SeederService>(SeederService);
  await seederService.seed();
  await app.listen(8080);
}
bootstrap();
