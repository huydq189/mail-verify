import { AuthResolver, SecureContext, SecureProperty } from '@heronjs/common';
import { Observable, of } from 'rxjs';

export type SampleSecurityType = {
    roles?: string[];
    permissions?: string[];
    accessType?: number;
};

export class AuthContext implements SecureContext<SampleSecurityType, SecureProperty> {
    OnGuard(data: SampleSecurityType): Observable<SecureProperty> {
        if (data === undefined) {
            return of({});
        } else {
            //verify jwt
        }
        // if (!auth) throw new APIError(StatusCodes.UNAUTHORIZED, 'Invalid Token!');
        return of(data || { roles: ['admin', 'moderator'], permissions: ['add-user'] });
    }

    static Resolver: AuthResolver<SampleSecurityType> = {
        http: ['header', 'authorization'],
        ws: ['handshake', 'token'],

        resolve: async (data?: string): Promise<SampleSecurityType> => {
            return {};
        },
    };
}
