import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';

(async () => {
  const app = await NestFactory.createApplicationContext(TypeOrmCoreModule, {
    logger: false // no logger
  });
  app.select(CommandModule).get(CommandService).exec();
})();
