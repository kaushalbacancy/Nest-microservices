import { NOTIFICATIONS_SERVICE } from '\'/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from '../dto/payment-create-charge.dto';
@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  constructor(private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy) {
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY') ?? ' ',
      {
        apiVersion: "2025-04-30.basil"
      }
    )
  }

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card
    // })
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      confirm: true,
      payment_method: 'pm_card_visa', // or a real one from frontend
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never' // 
      }
    });
    console.log( "paymentIntentpaymentIntentpaymentIntentpaymentIntent")
    this.notificationsService.emit('notify_email', { email })
    return paymentIntent
  }
}
