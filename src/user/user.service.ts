import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(registerUserDto: RegisterUserDto){
        try{
            return await this.userModel.create({
                fname: registerUserDto.fname,
                lname: registerUserDto.lname,
                email: registerUserDto.email,
                password: registerUserDto.password
            })
        }catch(err){
            console.log("Error creating user", err)

            const e = err as {code?: number}

            const DUPLICATE_KEY_ERROR_CODE = 11000;
            if (e.code === DUPLICATE_KEY_ERROR_CODE) {
                const fields = Object.keys(err.keyPattern);
                throw new ConflictException(`${fields.join(', ')} already exists`);
            }

            throw err;
        }

    }
}
