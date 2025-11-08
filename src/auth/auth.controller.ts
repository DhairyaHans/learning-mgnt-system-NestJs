import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';

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
    async register(@Body() registerUserDto: RegisterUserDto){
        const jwtToken = await this.authService.registerUser(registerUserDto)
        return jwtToken;
    }

    // POST /auth/login
    @Post("login")
    async login(@Body() loginUserDto: LoginUserDto){
        /*
            1. Receiver Email and Password
            2. Verify the Email and Password
            3. Return the JWT token
        */
       const jwtToken = await this.authService.loginUser(loginUserDto)
       return jwtToken
    }

}
