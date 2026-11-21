import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Controller, Post, Body, Res, HttpCode } from '@nestjs/common';
import type { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'register new user' })
    @ApiResponse({ status: 201, description: 'Registered Succesfully' })
    @ApiResponse({ status: 400, description: 'wrong format' })
    @ApiResponse({ status: 409, description: 'email has been registered' })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }
    @Post('login')
    @HttpCode(200)
    @ApiOperation({ summary: 'login' })
    @ApiResponse({ status: 200, description: 'login success, token set in cookie' })
    @ApiResponse({ status: 400, description: 'wrong format' })
    @ApiResponse({ status: 401, description: 'wrong email or password' })
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.login(dto);

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000,
        });

        return { message: 'login success' };
    }
}