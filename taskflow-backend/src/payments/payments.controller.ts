import { Body, Controller, Post, UseGuards, Req, Headers } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private payments: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  createCheckout(@Req() req: any, @Body('plan') plan: string) {
    return this.payments.createCheckoutSession(req.user.id, plan);
  }

  @Post('webhook')
  webhook(@Headers('stripe-signature') sig: string, @Req() req: any) {
    return this.payments.handleWebhook(sig, req.rawBody);
  }
}