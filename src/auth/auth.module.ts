import { Module } from '@nestjs/common';
import { authController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './Strategy';

@Module({
    imports: [JwtModule.register({})],
    controllers: [authController],
    providers: [AuthService, jwtStrategy]
})
export class AuthModule { }
