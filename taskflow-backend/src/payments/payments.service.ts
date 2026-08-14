import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

const PRICE_IDS: Record<string, string> = {
  individuals: process.env.STRIPE_PRICE_INDIVIDUALS!,
  elite: process.env.STRIPE_PRICE_ELITE!,
};

@Injectable()
export class PaymentsService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  constructor(private prisma: PrismaService) {}

  async createCheckoutSession(userId: string, plan: string) {
    const priceId = PRICE_IDS[plan];
    if (!priceId) throw new Error('Unknown plan');

    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.CLIENT_URL}/dashboard?paid=1`,
      cancel_url: `${process.env.CLIENT_URL}/checkout?plan=${plan}`,
      metadata: { userId, plan },
    });

    return { url: session.url };
  }

  async handleWebhook(signature: string, rawBody: Buffer) {
    const event = this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, plan } = session.metadata as { userId: string; plan: string };

      await this.prisma.subscription.upsert({
        where: { userId },
        update: { plan, status: 'active' },
        create: { userId, plan, status: 'active' },
      });
    }

    return { received: true };
  }
}