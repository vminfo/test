import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginUserDto{

    @IsNotEmpty({ message: 'Поле Логин обязательно для заполнения' })
    readonly login: string

    @IsNotEmpty({ message: 'Поле Пароль обязательно для заполнения' })
    readonly password: string
}