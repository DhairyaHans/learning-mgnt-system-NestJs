import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';

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
    register(@Body() registerUserDto: RegisterUserDto){
        const result = this.authService.registerUser(registerUserDto)
        return result
    }

}
