import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { LocationModule } from './location/location.module';
import { TicketSoldModule } from './ticket_sold/ticket_sold.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    EventModule,
    LocationModule,
    TicketSoldModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
