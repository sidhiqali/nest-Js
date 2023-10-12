import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class authDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}