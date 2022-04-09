import { HttpException, Injectable } from '@nestjs/common'
import {CreateUserDto} from "@app/modules/user/dto/createUser.dto";
import { UserEntity } from '@app/modules/user/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '@app/config/jwt'
import { UserResponseInterface } from '@app/modules/user/types/userResponse.interface'
import { LoginUserDto } from '@app/modules/user/dto/loginUser.dto'
import { compare, hash } from 'bcrypt'
import { UpdateUserDto } from '@app/modules/user/dto/updateUser.dto'

@Injectable()
export class UserService{
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity>{
        const userByEmail = await this.userRepository.findOne({
            email: createUserDto.email
        })

        const userByLogin = await this.userRepository.findOne({
            login: createUserDto.login
        })
        if (userByLogin && userByEmail){
            throw new HttpException('Пользователь с таким email и логином существует', 422)
        }
        else if (userByEmail) {
            throw new HttpException('Пользователь с таким email существует', 422)
        }
        else if (userByLogin) {
            throw new HttpException('Пользователь с таким логином существует', 422)
        }

        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto)
        return await this.userRepository.save(newUser)
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const user = await this.userRepository.findOne({
            login: loginUserDto.login
        }, {select: ['id', 'login', 'firstname', 'lastname', 'email', 'city', 'school',
            'yearStudy', 'liter', 'points', 'isBanned', 'createdAt', 'isActive', 'role', 'password']})

        if (!user){
            throw new HttpException('Такого пользователя не существует', 422)
        }

        const isPassword = await compare(loginUserDto.password, user.password)
        if (!isPassword) {
            throw new HttpException('Неверно введен пароль ', 422)
        }

        delete user.password

        return user
    }

    async updateUser(updateUserDto: UpdateUserDto, userId: number): Promise<UserEntity>{

        const userByEmail = await this.userRepository.findOne({
            email: updateUserDto.email
        })

        const userByLogin = await this.userRepository.findOne({
            login: updateUserDto.login
        })
        if (userByLogin && userByEmail){
            throw new HttpException('Пользователь с таким email и логином существует', 422)
        }
        else if (userByEmail) {
            throw new HttpException('Пользователь с таким email существует', 422)
        }
        else if (userByLogin) {
            throw new HttpException('Пользователь с таким логином существует', 422)
        }

        const user = await this.findById(userId)
        Object.assign(user, updateUserDto)
        return await this.userRepository.save(user)
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            login: user.login,
            email: user.email
        }, JWT_SECRET)
    }

    findById(id: number): Promise<UserEntity>{
        return this.userRepository.findOne(id)
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
}