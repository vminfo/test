import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto{

    @IsNotEmpty({ message: 'Поле Логин обязательно для заполнения' })
    readonly login: string

    @IsNotEmpty({ message: 'Поле Имя обязательно для заполнения' })
    readonly firstname: string

    @IsNotEmpty({ message: 'Поле Фамилия обязательно для заполнения' })
    readonly lastname: string

    @IsEmail({}, { message: 'Не правильно введен Email'})
    @IsNotEmpty({ message: 'Поле Email обязательно для заполнения' })
    readonly email: string

    @IsNotEmpty({ message: 'Поле Пароль обязательно для заполнения' })
    readonly password: string
}