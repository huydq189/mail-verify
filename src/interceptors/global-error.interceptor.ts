import { APIError, Errors, HttpResponseUtils, isString, Logger, RuntimeError } from '@heronjs/common';
import { ExpressErrorInterceptor, HttpRequest, HttpResponse, Next } from '@heronjs/express';
import { StatusCodes } from 'http-status-codes';

const GlobalApiErrorInterceptor: ExpressErrorInterceptor = (
    err: Error,
    req: HttpRequest,
    res: HttpResponse,
    next: Next,
) => {
    if (err) {
        const logger = new Logger('GlobalApiErrorInterceptor');
        logger.error(err.message, err);

        if (err instanceof APIError) {
            const cin = isString(err.code) ? +err.code : err.code;
            return res.status(cin).send(HttpResponseUtils.error(err));
        }

        if (err instanceof RuntimeError) {
            let cin = StatusCodes.INTERNAL_SERVER_ERROR;
            let details;

            if (err.name === Errors.VALIDATION_ERR) {
                cin = StatusCodes.BAD_REQUEST;
                details = err.payload;
            } else if (err.code === 10000) cin = StatusCodes.NOT_FOUND;

            return res.status(cin).send({ ...HttpResponseUtils.error(err), details });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
        });
    }

    return next();
};

export { GlobalApiErrorInterceptor };
