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
import { authConfig, KafkaConfig } from '../../../../../../configs';
import { KafkaService } from '../../../../infras/providers';

export type IVerifyEmailUseCase = IUseCase<VerifyEmailUseCaseInput, VerifyEmailUseCaseOutput>;

@Provider({ token: UsecaseTokens.VERIFY_MAILER, scope: Scope.REQUEST })
export class VerifyEmailUseCase
    extends UseCase<VerifyEmailUseCaseInput, VerifyEmailUseCaseOutput, VerifyEmailUseCaseContext>
    implements IVerifyEmailUseCase
{
    constructor(
        @Inject(ProviderTokens.KAFKA) private readonly _messageBus: KafkaService,
        @Inject(ProviderTokens.MAILTRAP) private readonly _mailProvider: IMailProvider,
    ) {
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
            try {
                type verifyOutput = {
                    email: string;
                };
                const { email } = (await jwt.verify(input.token, authConfig.jwtSecret)) as verifyOutput;
                this._messageBus.sendMessage(`${KafkaConfig.TOPIC_PREFIX}user.verified`, {
                    email,
                });
            } catch (error) {
                console.log(error);
            }
        };

    map: UseCasePipeMethod<VerifyEmailUseCaseMapInput, VerifyEmailUseCaseMapOutput> = async (input) => {
        return input;
    };
}
