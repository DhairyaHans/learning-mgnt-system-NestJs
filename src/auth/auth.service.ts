import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
            4. Generate JWT token
            5. Send token in response
        **/
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });

    const payload = {sub: user._id}
    const jwtToken = await this.jwtService.signAsync(payload)

    console.log("JWT TOKEN", jwtToken)
    return {'access_token': jwtToken};
  }
}
