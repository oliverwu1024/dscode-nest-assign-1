import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiTags, ApiOperation,ApiResponse} from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){};

    @Get()
    @ApiOperation({summary: 'get all users'})
    @ApiResponse({ status: 200, description: 'found the user' })
    getAllUsers():Promise<User[]> {
        return this.usersService.getAllUsers();
    }
}
