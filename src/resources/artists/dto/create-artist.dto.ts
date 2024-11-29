import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateArtistDto {
    @ApiProperty({ example: 'The Beatles', description: 'Artist name' })
    @IsString({ message: 'name must be a string' })
    @IsNotEmpty({ message: 'name must not be empty' })
    readonly name: string;

    @ApiProperty({ example: 'The Beatles biography', description: 'Artist biography' })
    @IsString({ message: 'bio must be a string' })
    readonly bio?: string;
}
