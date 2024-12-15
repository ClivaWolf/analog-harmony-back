import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNotEmpty, IsObject, Matches } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'User login' })
    @IsString({ message: 'login must be a string' })
    @IsNotEmpty({ message: 'login must not be empty' })
    readonly login: string;

    @ApiProperty({ example: 'John@mail.com', description: 'Email' })
    @IsString({ message: 'email must be a string' })
    @IsNotEmpty({ message: 'email must not be empty' })
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'email is not valid' })
    readonly email: string;

    @ApiProperty({ example: '1234', description: 'User password' })
    @IsString({ message: 'password must be a string' })
    @IsNotEmpty({ message: 'password must not be empty' })
    readonly password: string;
}

