// tslint:disable:no-implicit-dependencies

/**
 * transporter test
 * @ignore
 */

import {
    BAD_REQUEST,
    CREATED,
    FORBIDDEN,
    INTERNAL_SERVER_ERROR,
    NO_CONTENT,
    NOT_FOUND,
    NOT_IMPLEMENTED,
    OK,
    UNAUTHORIZED
} from 'http-status';
import { } from 'mocha';
import * as nock from 'nock';
import * as assert from 'power-assert';
import * as sinon from 'sinon';

import { DefaultTransporter, RequestError } from './transporters';

const API_ENDPOINT = 'https://example.com';

describe('fetch()', () => {
    let scope: nock.Scope;
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        nock.cleanAll();
        nock.disableNetConnect();
    });

    afterEach(() => {
        sandbox.restore();
        nock.cleanAll();
        nock.enableNetConnect();
    });

    // tslint:disable-next-line:mocha-no-side-effect-code
    [CREATED, OK].forEach((statusCode) => {
        it(`次のステータスコードが返却されれば、レスポンスを取得できるはず ${statusCode}`, async () => {
            const body: any = { key: 'value' };

            const transporter = new DefaultTransporter([statusCode]);

            scope = nock(API_ENDPOINT)
                .get('/uri')
                .reply(statusCode, body);

            const result = await transporter.fetch(`${API_ENDPOINT}/uri`, {});

            assert.deepEqual(result, body);
            sandbox.verify();
            assert(scope.isDone());
        });
    });

    // tslint:disable-next-line:mocha-no-side-effect-code
    [NO_CONTENT].forEach((statusCode) => {
        it(`次のステータスコードが返却されれば、レスポンスはundefinedのはず ${statusCode}`, async () => {
            const body = undefined;

            const transporter = new DefaultTransporter([statusCode]);

            scope = nock(API_ENDPOINT)
                .get('/uri')
                .reply(statusCode, body);

            const result = await transporter.fetch(`${API_ENDPOINT}/uri`, {});

            assert.deepEqual(result, body);
            sandbox.verify();
            assert(scope.isDone());
        });
    });

    // tslint:disable-next-line:mocha-no-side-effect-code
    [
        BAD_REQUEST,
        FORBIDDEN,
        INTERNAL_SERVER_ERROR,
        NOT_FOUND,
        NOT_IMPLEMENTED,
        UNAUTHORIZED
    ].forEach((statusCode) => {
        it(`次のステータスコードが返却されれば、リクエストエラーが投げられるはず ${statusCode}`, async () => {
            const body = {
                error: {
                    errors: [],
                    code: statusCode,
                    message: 'message'
                }
            };

            const transporter = new DefaultTransporter([OK]);

            scope = nock(API_ENDPOINT)
                .get('/uri')
                .reply(statusCode, body);

            const result = await transporter.fetch(`${API_ENDPOINT}/uri`, {}).catch((err) => err);

            assert(result instanceof Error);
            assert.equal((<RequestError>result).code, statusCode);
            assert.equal((<RequestError>result).message, body.error.message);
            sandbox.verify();
            assert(scope.isDone());
        });
    });

    it('レスポンスボディがjsonでなければ、適切なエラーが投げられるはず', async () => {
        const body = 'body text';
        const statusCode = INTERNAL_SERVER_ERROR;

        const transporter = new DefaultTransporter([OK]);

        scope = nock(API_ENDPOINT)
            .get('/uri')
            .reply(statusCode, body);

        const result = await transporter.fetch(`${API_ENDPOINT}/uri`, {}).catch((err) => err);
        assert(result instanceof Error);
        assert.equal((<RequestError>result).code, statusCode);
        assert.equal((<RequestError>result).message, body);
        sandbox.verify();
        assert(scope.isDone());
    });
});

describe('CONFIGURE()', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('すでにヘッダー情報があれば、継承されるされるはず', async () => {
        const options = {
            headers: {
                'User-Agent': 'useragent'
            }
        };

        const result = DefaultTransporter.CONFIGURE(options);
        assert.deepEqual(result.headers, options.headers);
        sandbox.verify();
    });

    // it('既存のUser-Agentヘッダーにパッケージ情報がなければ、ヘッダーに情報が追加されるはず', async () => {
    //     const options = {
    //         headers: {
    //             'User-Agent': 'useragent'
    //         }
    //     };

    //     const result = DefaultTransporter.CONFIGURE(options);
    //     assert(result.headers['User-Agent'].indexOf(DefaultTransporter.USER_AGENT) > 0);
    //     sandbox.verify();
    // });
});
