import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [UserModule, EventModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
