import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Prefix all routes with 'auth'
export class AuthController {

    // Inject AuthService via constructor  

    // Using shorthand syntax to declare and initialize
    constructor(private readonly authService: AuthService) {}

    // Alternative longer syntax:
    // authService: AuthService    
    // constructor(authService: AuthService){
    //     this.authService = authService
    // }

    // POST /auth/register
    @Post("register")
    register(){
        const result = this.authService.registerUser()
        return result
    }

}
