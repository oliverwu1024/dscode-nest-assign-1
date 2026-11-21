import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

// Replace the real bcrypt with a fake one
jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersRepository = {
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    const dto = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123' };

    it('should register a user and not return the password', async () => {
      mockUsersRepository.findOneBy.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
      mockUsersRepository.save.mockResolvedValue({ id: 'u1', ...dto, password: 'hashed' });

      const result = await service.register(dto);

      expect(result).toEqual({ id: 'u1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' });
      expect(result).not.toHaveProperty('password');
    });

    it('should save the hashed password, not the plain one', async () => {
      mockUsersRepository.findOneBy.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
      mockUsersRepository.save.mockResolvedValue({ id: 'u1', ...dto, password: 'hashed' });

      await service.register(dto);

      expect(mockUsersRepository.save).toHaveBeenCalledWith({ ...dto, password: 'hashed' });
    });

    it('should throw ConflictException when the email is already registered', async () => {
      mockUsersRepository.findOneBy.mockResolvedValue({ id: 'u1' });

      await expect(service.register(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    const dto = { email: 'john@example.com', password: 'password123' };
    const fakeUser = { id: 'u1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'hashed' };

    it('should return a JWT when email and password are correct', async () => {
      mockUsersRepository.findOne.mockResolvedValue(fakeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('fake-jwt');

      const result = await service.login(dto);

      expect(result).toBe('fake-jwt');
      expect(mockJwtService.sign).toHaveBeenCalledWith({ id: 'u1', userName: 'John Doe' });
    });

    it('should throw UnauthorizedException when the user does not exist', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when the password is wrong', async () => {
      mockUsersRepository.findOne.mockResolvedValue(fakeUser);       
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);        
      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });
  });
});