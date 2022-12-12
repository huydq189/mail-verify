import { Inject, Provider, Scope } from '@heronjs/common';
import { ProviderTokens, UsecaseTokens } from '../../../../../../constants';
import {
    VerifyEmailUseCaseContext,
    VerifyEmailUseCaseInput,
    VerifyEmailUseCaseInputModel,
    VerifyEmailUseCaseMapInput,
    VerifyEmailUseCaseMapOutput,
    VerifyEmailUseCaseOutput,
    VerifyEmailUseCaseProcessingInput,
    VerifyEmailUseCaseProcessingOutput,
    VerifyEmailUseCaseValidateInput,
    VerifyEmailUseCaseValidateOutput,
} from './types';
import { IUseCase, UseCase, UseCasePipeMethod, ValidatorUtil } from '@cbidigital/aqua';
import { IMailProvider } from '../../../../infras/providers/mail/types';
import jwt from 'jsonwebtoken';

export type IVerifyEmailUseCase = IUseCase<VerifyEmailUseCaseInput, VerifyEmailUseCaseOutput>;

@Provider({ token: UsecaseTokens.VERIFY_MAILER, scope: Scope.REQUEST })
export class VerifyEmailUseCase
    extends UseCase<VerifyEmailUseCaseInput, VerifyEmailUseCaseOutput, VerifyEmailUseCaseContext>
    implements IVerifyEmailUseCase
{
    constructor(@Inject(ProviderTokens.MAILTRAP) private readonly _mailProvider: IMailProvider) {
        super();
        this.setMethods([this.validate.bind(this), this.processing.bind(this), this.map.bind(this)]);
    }

    validate: UseCasePipeMethod<VerifyEmailUseCaseValidateInput, VerifyEmailUseCaseValidateOutput> = async (
        input,
    ) => {
        const model = await ValidatorUtil.validatePlain<VerifyEmailUseCaseInput>(
            VerifyEmailUseCaseInputModel,
            input,
        );
        return model;
    };

    processing: UseCasePipeMethod<VerifyEmailUseCaseProcessingInput, VerifyEmailUseCaseProcessingOutput> =
        async (input) => {
            // Verifying the JWT token
            jwt.verify(input.token, 'ourSecretKey', function (err, decoded) {
                console.log('HUYDEBUG decoded: ', decoded);
                if (err) {
                    console.log(err);
                    throw new Error('Email verification failed  possibly the link is invalid or expired');
                }
            });
        };

    map: UseCasePipeMethod<VerifyEmailUseCaseMapInput, VerifyEmailUseCaseMapOutput> = async (input) => {
        return input;
    };
}
