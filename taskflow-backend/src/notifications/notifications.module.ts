import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications/notifications.gateway';

@Module({
  providers: [NotificationsService, NotificationsGateway]
})
export class NotificationsModule {}
