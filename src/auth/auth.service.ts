import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}
    registerUser(){
        // Logic to register a user

        /** Steps might include:
            1. Check if email already exists
            2. Hash the password
            3. Store the user in the database
            4. Generate JWT token
            5. Send token in response
        **/
        return this.userService.createUser()
    }
}
