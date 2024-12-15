import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsDateString, IsOptional, IsString } from "class-validator"


export class CreateProfileDto {
    @ApiProperty({ example: 'John', description: 'Name' })
    @IsString({ message: 'name must be a string' })
    name?: string

    @ApiProperty({ example: 'Smith', description: 'Surname' })
    @IsString({ message: 'surname must be a string' })
    surname?: string

    @ApiProperty({ example: 'Doe', description: 'Patronymic' })
    @IsString({ message: 'patronymic must be a string' })
    @IsOptional()
    patronymic?: string

    @ApiProperty({ example: '1990-01-01', description: 'Birthday' })
    @IsDateString()
    @IsOptional()
    birthday?: Date

    @ApiProperty({ example: 'Moscow', description: 'City' })
    @IsString({ message: 'city must be a string' })
    @IsOptional()
    city?: string

    @ApiProperty({ example: 'kt12o99mg2.gif', description: 'Avatar, add http://localhost:4444/uploads' })
    @IsString({ message: 'avatar must be a string' })
    @IsOptional()
    avatar?: string

    @ApiProperty({ example: 'true', description: 'Visibility of email' })
    @IsBoolean({ message: 'emailVisible must be a boolean' })
    @IsOptional()
    emailVisible?: boolean

    @ApiProperty({ example: '--John Smith--', description: 'Signature' })
    @IsString({ message: 'signature must be a string' })
    @IsOptional()
    signature?: string
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}