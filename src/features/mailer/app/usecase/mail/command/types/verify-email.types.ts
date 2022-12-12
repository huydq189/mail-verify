import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export type VerifyEmailUseCaseInput = {
    token: string;
};

export class VerifyEmailUseCaseInputModel implements VerifyEmailUseCaseInput {
    @Expose()
    @IsNotEmpty()
    @IsString()
    public readonly token!: string;
}

export type VerifyEmailUseCaseOutput = void;

export type VerifyEmailUseCaseContext = {
    firstInput: VerifyEmailUseCaseInput;
};

export type VerifyEmailUseCaseValidateInput = VerifyEmailUseCaseInput;
export type VerifyEmailUseCaseValidateOutput = VerifyEmailUseCaseInput;

export type VerifyEmailUseCaseProcessingInput = VerifyEmailUseCaseValidateOutput;
export type VerifyEmailUseCaseProcessingOutput = void;

export type VerifyEmailUseCaseMapInput = VerifyEmailUseCaseProcessingOutput;
export type VerifyEmailUseCaseMapOutput = void;
