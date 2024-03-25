import { Injectable } from '@nestjs/common';
import { User } from '@app/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
    ) {}

  async login (user: User, response: Response) {
    const tokenPayLoad: TokenPayload = {
      userId: user.id
    }

    const expires = new Date()
    expires.setSeconds(
      expires.getSeconds() + Number(this.configService.get('JWT_EXPIRATION'))
    )

    const token = this.jwtService.sign(tokenPayLoad)
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires
    })
  }

}
