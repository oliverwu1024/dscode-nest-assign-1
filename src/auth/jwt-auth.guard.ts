import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();


    const token = request.cookies?.token;
    if (!token) {
        throw new UnauthorizedException('Please login first');
    }


    try {
        request.user = this.jwtService.verify(token);
        return true;
    } catch {
        throw new UnauthorizedException('Login expired or unauthorized');
    }
  }
}