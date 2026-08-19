import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ProjectsModule } from './projects/projects.module';
import { StatsModule } from './stats/stats.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { InvitationsModule } from './invitations/invitations.module';
import { AiModule } from './ai/ai.module';
import { FilesModule } from './files/files.module';
import { SessionsModule } from './sessions/sessions.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    SubscriptionsModule,
    ProjectsModule,
    StatsModule,
    TasksModule,
    CommentsModule,
    AttachmentsModule,
    UsersModule,
    ChatModule,
    InvitationsModule,
    AiModule,
    FilesModule,
    SessionsModule,
    PaymentsModule,
  ],
})
export class AppModule {}