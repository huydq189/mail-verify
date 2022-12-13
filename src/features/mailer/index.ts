import { Module } from '@heronjs/common';
import { MessageBusService } from './app/service/messaging/messaging.service';
import { SendVerificationEmailUseCase, VerifyEmailUseCase } from './app/usecase/mail/command';
import { KafkaService, MailtrapMailProvider } from './infras/providers';
import { MailerRest } from './presentation/controllers/mailers';

@Module({
    controllers: [MailerRest],
    services: [MessageBusService],
    providers: [
        // Query util

        // Provider
        MailtrapMailProvider,
        KafkaService,
        MessageBusService,

        // DAOs

        // Repos

        // UseCases
        SendVerificationEmailUseCase,
        VerifyEmailUseCase,
    ],
})
export class MailersModule {}
