import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';
import { EventModule } from './event/event.module';

@Module({
  imports: [UserModule, EventModule],
  controllers: [AppController, EventController],
  providers: [AppService, EventService],
})
export class AppModule {}
