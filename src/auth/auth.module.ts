import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: 'my-secret-key',
    signOptions:{expiresIn: '1h'}
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule],
})
export class AuthModule {}
