import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  notifyEmail({ email, text }: NotifyEmailDto) {
    console.log(`email: ${email}`)
    console.log(`text: ${text}`)

  }
}
