import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '@app/common';
import { UserDocument } from './models/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Post()
    async createUser(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.usersService.create(createUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@CurrentUser() user: UserDocument) {
        return user;
    }
}