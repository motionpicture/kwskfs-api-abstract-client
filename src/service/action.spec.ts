// tslint:disable:no-implicit-dependencies

/**
 * action service test
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as sasaki from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('printTicket()', () => {
    let sandbox: sinon.SinonSandbox;
    let actions: sasaki.service.Action;

    before(() => {
        const auth = new StubAuthClient();
        actions = new sasaki.service.Action({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('fetch結果が正常であればそのまま取得できるはず', async () => {
        const params = {};
        const data: any = {};

        sandbox.mock(actions).expects('fetch').once().resolves(data);

        const result = await actions.printTicket(<any>params);
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('fetch結果が正常でなければエラーになるはず', async () => {
        const params = {};
        const error = new sasaki.transporters.RequestError('invalid request');

        sandbox.mock(actions).expects('fetch').once().rejects(error);

        const result = await actions.printTicket(<any>params).catch((err) => err);
        assert.deepEqual(result, error);
        sandbox.verify();
    });
});

describe('searchPrintTicket()', () => {
    let sandbox: sinon.SinonSandbox;
    let actions: sasaki.service.Action;

    before(() => {
        const auth = new StubAuthClient();
        actions = new sasaki.service.Action({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('fetch結果が正常であればそのまま取得できるはず', async () => {
        const params = {};
        const data: any[] = [];

        sandbox.mock(actions).expects('fetch').once().resolves(data);

        const result = await actions.searchPrintTicket(<any>params);
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('fetch結果が正常でなければエラーになるはず', async () => {
        const params = {};
        const error = new sasaki.transporters.RequestError('invalid request');

        sandbox.mock(actions).expects('fetch').once().rejects(error);

        const result = await actions.searchPrintTicket(<any>params).catch((err) => err);
        assert.deepEqual(result, error);
        sandbox.verify();
    });
});
