import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { UserService } from "@app/modules/user/user.service";
import { CreateUserDto } from "@app/modules/user/dto/createUser.dto";
import { UserResponseInterface } from '@app/modules/user/types/userResponse.interface'
import { LoginUserDto } from '@app/modules/user/dto/loginUser.dto'
import { User } from '@app/modules/user/decorators/user.decorator'
import { UserEntity } from '@app/modules/user/user.entity'
import { AuthGuard } from '@app/modules/user/guards/auth.guard'
import { UpdateUserDto } from '@app/modules/user/dto/updateUser.dto'

@Controller()
export class UserController{

    constructor(private readonly userService: UserService) {}

    @Post('reg')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface>{
        const user = await this.userService.createUser(createUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Post('auth')
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(@User() user: UserEntity): Promise<UserResponseInterface>{
        return this.userService.buildUserResponse(user)
    }

    @Put('user')
    @UseGuards(AuthGuard)
    async updateCurrentUser(@Body('user') updateUserDto: UpdateUserDto,
                 @User('id') currentUserId: number): Promise<UserResponseInterface>{
        const user = await this.userService.updateUser(updateUserDto, currentUserId)
        return this.userService.buildUserResponse(user)
    }
}