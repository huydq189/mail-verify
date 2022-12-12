import 'reflect-metadata';
import { AppModule } from './app';
import { HeronJS } from '@heronjs/core';
import { GlobalApiErrorInterceptor } from './interceptors';

const main = async () => {
    const app = await HeronJS.create({ module: AppModule });
    await app.listen({
        port: 3001,
        options: {
            cors: {
                origin: '*',
                preflightContinue: false,
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            },
            globalError: GlobalApiErrorInterceptor,
        },
    });
};

(async () => main())();
