import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    createUser(registerUserDto: RegisterUserDto){
        return this.userModel.create({
            fname: registerUserDto.fname,
            lname: registerUserDto.lname,
            email: registerUserDto.email,
            password: registerUserDto.password
        })
    }
}
