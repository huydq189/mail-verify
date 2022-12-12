import { Rest, Post, Inject, Body, APIError, Get, Param } from '@heronjs/common';
import { StatusCodes } from 'http-status-codes';
import { UsecaseTokens } from '../../../../../../constants';
import {
    ISendVerificationEmailUseCase,
    IVerifyEmailUseCase,
    SendVerificationEmailUseCaseInput,
} from '../../../../app/usecase/mail/command';

@Rest('/mailers')
export class MailerRest {
    constructor(
        @Inject(UsecaseTokens.SEND_VERIFICATION_MAILER)
        private readonly _sendVerificationEmailUsecase: ISendVerificationEmailUseCase,
        @Inject(UsecaseTokens.VERIFY_MAILER)
        private readonly _verifyEmailUsecase: IVerifyEmailUseCase,
    ) {}

    @Post({ uri: '/send-verification' })
    async register(@Body() body: SendVerificationEmailUseCaseInput) {
        // await this.authService.createEmailToken(newUser.email);
        //await this.authService.saveUserConsent(newUser.email); //[GDPR user content]
        try {
            await this._sendVerificationEmailUsecase.exec(body);
        } catch (error) {
            console.log('HUYDEBUG >>> ', error);
            throw new APIError(StatusCodes.INTERNAL_SERVER_ERROR, 'cant send email');
        }
    }

    @Get({ uri: '/verify/:token' })
    public async verifyEmail(@Param('token') token: string) {
        await this._verifyEmailUsecase.exec({ token });
    }
}
