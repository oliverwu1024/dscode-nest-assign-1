import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [OrdersModule, UsersModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
