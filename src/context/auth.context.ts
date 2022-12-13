import { APIError, AuthResolver, JWTToken, SecureContext, SecureProperty } from '@heronjs/common';
import { Observable, of } from 'rxjs';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { authConfig } from '../configs';
export type SampleSecurityType = {
    roles?: string[];
    permissions?: string[];
    accessType?: number;
};

export class AuthContext implements SecureContext<JWTToken, SecureProperty> {
    OnGuard(data: JWTToken): Observable<SecureProperty> {
        if (data === undefined) {
            return of({});
        } else {
            //verify jwt
            try {
                const token = data.toString().split(' ')[1];
                jwt.verify(token, authConfig.jwtSecret);
                return of({});
            } catch (error: any) {
                throw new APIError(StatusCodes.UNAUTHORIZED, 'Token is not valid');
            }
        }
    }

    static Resolver: AuthResolver<JWTToken> = {
        http: ['header', 'authorization'],
        ws: ['handshake', 'token'],
        resolve: async (data?: string): Promise<any> => {
            return data;
        },
    };
}
