import { Module } from '@heronjs/common';
import { SendVerificationEmailUseCase, VerifyEmailUseCase } from '../../../app/usecase/mail/command';
import { MailtrapMailProvider } from '../../../infras/providers';
import { MailerRest } from './rest/mailer.rest';

@Module({
    controllers: [MailerRest],
    providers: [
        // Query util

        // Provider
        MailtrapMailProvider,

        // DAOs

        // Repos

        // UseCases
        SendVerificationEmailUseCase,
        VerifyEmailUseCase,
    ],
})
export class MailersModule {}
