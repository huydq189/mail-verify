import { MailersModule } from './features/mailer';
import { GateKeeper, Module } from '@heronjs/common';
import { AuthContext } from './context';

@Module({
    imports: [MailersModule],
})
@GateKeeper(AuthContext, AuthContext.Resolver)
export class AppModule {}
