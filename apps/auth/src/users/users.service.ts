import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
import { Role, User } from '@app/common';

@Injectable()
export class UsersService {
    constructor( private readonly userRepository: UserRepository) {}

    private async validateCreateUser(createUserDto: CreateUserDto){
        try {
            await this.userRepository.findOne({email: createUserDto.email})
        } catch (err) {
            return;
        }
        throw new UnprocessableEntityException('Email already exists!')
    }
    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUser(createUserDto)
        const user = new User({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
            roles: createUserDto.roles?.map(roleDto => new Role(roleDto))
        })
        return this.userRepository.create(user)
    }

    async verifyUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ email })
        const passwordIsValid = await bcrypt.compare(password, user.password)

        if(!passwordIsValid) throw new UnauthorizedException('Credentials are not valid!')
        return user;
    }
    
    async getUser(getUserDto: GetUserDto) {
        return this.userRepository.findOne(getUserDto, {roles: true})
    }
}
