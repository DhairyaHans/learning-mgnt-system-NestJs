import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/loginUser.dto';
import bcrypt from 'bcrypt';

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

    async verifyUserCredentials(loginUserDto: LoginUserDto){
        /*
            1. Check if email exists in the db
            2. Check if password matches the found emails' password
        */
        try{
            const user = await this.userModel.findOne({
                email: loginUserDto.email
            })

            if (!user){
                throw new BadRequestException("Email doesn't exists")
            }

            const isMatch = await bcrypt.compare(loginUserDto.password, user?.password);
            
            if (!isMatch){
                throw new UnauthorizedException("Invalid Email or Password")
            }

            return user

        } catch(err){
            console.log("error - ", err)
            throw err
        }
    }
}
