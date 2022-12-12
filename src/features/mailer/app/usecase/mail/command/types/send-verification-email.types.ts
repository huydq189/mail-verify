import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export type SendVerificationEmailUseCaseInput = {
    email: string;
};

export class SendVerificationEmailUseCaseInputModel implements SendVerificationEmailUseCaseInput {
    @Expose()
    @IsEmail()
    public readonly email!: string;
}

export type SendVerificationEmailUseCaseOutput = void;

export type SendVerificationEmailUseCaseContext = {
    firstInput: SendVerificationEmailUseCaseInput;
};

export type SendVerificationEmailUseCaseValidateInput = SendVerificationEmailUseCaseInput;
export type SendVerificationEmailUseCaseValidateOutput = SendVerificationEmailUseCaseInput;

export type SendVerificationEmailUseCaseProcessingInput = SendVerificationEmailUseCaseValidateOutput;
export type SendVerificationEmailUseCaseProcessingOutput = void;

export type SendVerificationEmailUseCaseMapInput = SendVerificationEmailUseCaseProcessingOutput;
export type SendVerificationEmailUseCaseMapOutput = void;
