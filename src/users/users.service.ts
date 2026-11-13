import { Injectable } from '@nestjs/common';
import { User } from './user.model';


@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: "user-1",
            firstName: "Oliver",
            lastName: "Wu",
            password: "dasdasd",
            dob: "",
            adminNotes: ""
        },
        {
            id: "user-2",
            firstName: "Jay",
            lastName: "Z",
            password: "dasdasd",
            dob: "",
            adminNotes: ""
        },
        {
            id: "user-3",
            firstName: "Frank",
            lastName: "Uni",
            password: "dasdasd",
            dob: "",
            adminNotes: ""
        },
    ];

    getAllUsers(): User[] {
        return this.users;
    }

}
