import { CreateChargeDto } from '\'/common/dto/create-charge.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY') ?? ' ',
      {
        apiVersion: "2025-04-30.basil"
      }
    )
  }

  async createCharge({ card, amount }: CreateChargeDto) {
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
    console.log(paymentIntent,"paymentIntentpaymentIntentpaymentIntentpaymentIntent")
    return paymentIntent
  }
}
