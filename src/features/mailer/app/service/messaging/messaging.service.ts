import { Service, OnStart, Inject, EventName, PreDestroy } from '@heronjs/common';
import { ProviderTokens } from '../../../../../constants';
import { KafkaService } from '../../../infras/providers';
import { EachMessageHandler } from 'kafkajs';
import { authConfig, KafkaConfig } from '../../../../../configs';
import { IMailProvider } from '../../../infras/providers/mail/types';
import jwt from 'jsonwebtoken';

@Service()
@EventName('userCreated')
export class MessageBusService {
    constructor(
        @Inject(ProviderTokens.KAFKA)
        private readonly _messageBus: KafkaService,
        @Inject(ProviderTokens.MAILTRAP)
        private readonly _mailProvider: IMailProvider,
    ) {}

    @OnStart()
    start = async () => {
        const messageHandler: EachMessageHandler = async ({ message }) => {
            const response = JSON.parse(message.value!.toString());

            const token = jwt.sign(
                {
                    email: response.email,
                },
                authConfig.jwtSecret,
                { expiresIn: authConfig.jwtDuration },
            );

            const mailOptions = {
                to: {
                    name: response.email,
                    email: response.email,
                },
                from: {
                    name: 'ChiDoanh',
                    email: 'foo@example.com',
                },
                subject: 'Verify Email',
                body: `Hi! There, You have recently visited
                    our website and entered your email.
                    Please follow the given link to verify your email
                    <a href="http://localhost:3001/mailers/verify/${token}" >Verify</a>
                    Thanks`,
            };

            await this._mailProvider.sendMail(mailOptions);
        };
        this._messageBus.startConsumer(KafkaConfig.TOPIC_PREFIX + 'user.created', messageHandler);
    };

    @PreDestroy()
    destroy = async () => {
        // logic here
    };
}
