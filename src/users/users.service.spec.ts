import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;


  const mockUsersRepository = {
    find: jest.fn(),
  };


  const fakeUser = { id: 'user-1', firstName: 'John', lastName: 'Doe' };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      mockUsersRepository.find.mockResolvedValue([fakeUser]);   
      const result = await service.getAllUsers();                
      expect(result).toEqual([fakeUser]);                        
    });
    it('should return an empty array when there are no orders', async () => {
      mockUsersRepository.find.mockResolvedValue([]);
      const result = await service.getAllUsers();
      expect(result).toEqual([]);
    });
  });
}); 