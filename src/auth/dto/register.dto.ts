import {ApiProperty} from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'John' })
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @ApiProperty({ example: 'Doe' })
    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @ApiProperty({ example: 'example123@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ example: 'password123' })
    @IsNotEmpty()
    @MinLength(6)
    password!: string;
}