import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService:JwtService,
    ) {}

    async register(dto: RegisterDto) {
    
    const existing = await this.usersRepository.findOneBy({ email: dto.email });
    if (existing) {
        throw new ConflictException('This email has been registered');
    }


    const hashedPassword = await bcrypt.hash(dto.password, 10);


    const user = await this.usersRepository.save({ ...dto, password: hashedPassword });

    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    }

    async login(dto: LoginDto) {
        
        const user = await this.usersRepository.findOne({
        where: { email: dto.email },
        select: { id: true, firstName: true, lastName: true, email: true, password: true },
        });

        if (!user || !user.password) {
        throw new UnauthorizedException('wrong email or password');
        }

        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
        throw new UnauthorizedException('wrong email or password');
        }


        const payload = { id: user.id, userName: `${user.firstName} ${user.lastName}` };
        return this.jwtService.sign(payload);
    }

}