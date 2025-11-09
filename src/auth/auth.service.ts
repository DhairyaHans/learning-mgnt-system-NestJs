import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    console.log('registerUserDto', registerUserDto);

    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

    // Logic to register a user
    /** Steps might include:
            1. Check if email already exists ✅
            2. Hash the password ✅
            3. Store the user in the database ✅
            4. Generate JWT token ✅
            5. Send token in response ✅
         **/
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });

    const payload = {sub: user._id, role: user.role}
    const jwtToken = await this.jwtService.signAsync(payload)

    return {'access_token': jwtToken};
  }

  async loginUser(loginUserDto: LoginUserDto){
    // Logic to Login the User
    /*
      1. Verify the Email and Password from the Db
      2. Generate JWT Token, if user login successfully
      3. Send the token in response
    */
    const user = await this.userService.verifyUserCredentials(loginUserDto)

    const payload = {sub: user._id, role: user.role}
    const jwtToken = await this.jwtService.signAsync(payload)
    
    return {"access_token": jwtToken}
  }
}
