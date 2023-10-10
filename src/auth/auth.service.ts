import { ForbiddenException, Injectable } from '@nestjs/common';
import { authDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async signup(dto: authDto) {
        try {
            const { email, password } = dto;
            const hash = await argon.hash(password);
            const user = await this.prisma.user.create({
                data: {
                    email,
                    hash,
                },
            });
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials already existes');
                }
            }
            throw error;
        }
    }

    async login(dto: authDto) {
        const { email, password } = dto;
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) throw new ForbiddenException('User not found');

        const passwordMatch = await argon.verify(user.hash, password);

        if (!passwordMatch) {
            throw new ForbiddenException('password mismatch');
        }
        return this.signToken(user.id, user.email)


    }
    async signToken(userId: number, email: string) {
        const payload = {
            sub: userId,
            email,
        };
        const secret = this.config.get('JWT_SECRET')
        const configs = {
            expiresIn: '15m',
            secret
        }
        const token = await this.jwt.signAsync(payload, configs)

        return {
            access_Token: token
        }
    }
}
