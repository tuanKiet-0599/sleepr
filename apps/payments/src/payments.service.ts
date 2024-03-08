import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'),{
    apiVersion: '2023-10-16'
  })
  constructor(private readonly configService: ConfigService) {}

  async createCharge({amount}: CreateChargeDto) {
   try {

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      payment_method: 'pm_card_visa',
      currency: 'aud',
      payment_method_types: ['card']
    });
    return paymentIntent
   } catch (err) {
    return err
   }
  }
}
