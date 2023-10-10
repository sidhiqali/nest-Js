import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { authDto } from "./dto";


@Controller('auth')
export class authController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: authDto) {
        console.log(dto)
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: authDto) {
        return this.authService.login(dto)
    }
}