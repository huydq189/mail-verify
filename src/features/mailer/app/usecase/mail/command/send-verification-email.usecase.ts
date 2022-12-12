import { Inject, Provider, Scope } from '@heronjs/common';
import { ProviderTokens, UsecaseTokens } from '../../../../../../constants';
import {
    SendVerificationEmailUseCaseContext,
    SendVerificationEmailUseCaseInput,
    SendVerificationEmailUseCaseInputModel,
    SendVerificationEmailUseCaseMapInput,
    SendVerificationEmailUseCaseMapOutput,
    SendVerificationEmailUseCaseOutput,
    SendVerificationEmailUseCaseProcessingInput,
    SendVerificationEmailUseCaseProcessingOutput,
    SendVerificationEmailUseCaseValidateInput,
    SendVerificationEmailUseCaseValidateOutput,
} from './types';
import { IUseCase, UseCase, UseCasePipeMethod, ValidatorUtil } from '@cbidigital/aqua';
import { IMailProvider } from '../../../../infras/providers/mail/types';
import jwt from 'jsonwebtoken';

export type ISendVerificationEmailUseCase = IUseCase<
    SendVerificationEmailUseCaseInput,
    SendVerificationEmailUseCaseOutput
>;

@Provider({ token: UsecaseTokens.SEND_VERIFICATION_MAILER, scope: Scope.REQUEST })
export class SendVerificationEmailUseCase
    extends UseCase<
        SendVerificationEmailUseCaseInput,
        SendVerificationEmailUseCaseOutput,
        SendVerificationEmailUseCaseContext
    >
    implements ISendVerificationEmailUseCase
{
    constructor(@Inject(ProviderTokens.MAILTRAP) private readonly _mailProvider: IMailProvider) {
        super();
        this.setMethods([this.validate.bind(this), this.processing.bind(this), this.map.bind(this)]);
    }

    validate: UseCasePipeMethod<
        SendVerificationEmailUseCaseValidateInput,
        SendVerificationEmailUseCaseValidateOutput
    > = async (input) => {
        const model = await ValidatorUtil.validatePlain<SendVerificationEmailUseCaseInput>(
            SendVerificationEmailUseCaseInputModel,
            input,
        );
        return model;
    };

    processing: UseCasePipeMethod<
        SendVerificationEmailUseCaseProcessingInput,
        SendVerificationEmailUseCaseProcessingOutput
    > = async (input) => {
        const token = jwt.sign(
            {
                data: 'Token Data',
            },
            'ourSecretKey',
            { expiresIn: '10m' },
        );

        const mailOptions = {
            to: {
                name: input.email,
                email: input.email,
            },
            from: {
                name: 'ChiDoanh',
                email: 'foo@example.com',
            },
            subject: 'Verify Email',
            body: `Hi! There, You have recently visited
                    our website and entered your email.
                    Please follow the given link to verify your email
                    http://localhost:3000/mailers/verify/${token}
                    Thanks`,
        };

        await this._mailProvider.sendMail(mailOptions);
    };

    map: UseCasePipeMethod<SendVerificationEmailUseCaseMapInput, SendVerificationEmailUseCaseMapOutput> =
        async (input) => {
            return input;
        };
}
