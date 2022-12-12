import { IMailProvider, IMessage } from './types/mail-provider.types';
import { Provider, Scope } from '@heronjs/common';
import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';
import { ProviderTokens } from '../../../../../constants';
import { mailConfig } from '../../../../../configs';

@Provider({
    token: ProviderTokens.MAILTRAP,
    scope: Scope.SINGLETON,
})
export class MailtrapMailProvider implements IMailProvider {
    private transporter: Mail;
    constructor() {
        this.transporter = nodemailer.createTransport(mailConfig.mailTrap);
    }
    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body,
        });
    }
}
