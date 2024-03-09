import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService){}

  private readonly nodemailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAUTH2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN')
    }
  });
  async notifyEmail({email, text}: NotifyEmailDto) {
    this.nodemailer.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'No Reply, Sleepr Notification',
      text
    })
  }
}
