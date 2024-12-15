import { IsNotEmpty, IsString } from "class-validator"


export class LoginDto {
    @IsString({ message: 'login must be a string' })
    @IsNotEmpty({ message: 'login must not be empty' })
    login: string

    @IsString({ message: 'password must be a string' })
    @IsNotEmpty({ message: 'password must not be empty' })
    password: string
}