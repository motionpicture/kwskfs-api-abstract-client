// tslint:disable:no-implicit-dependencies

/**
 * place service test
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as sasaki from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('place service', () => {
    let sandbox: sinon.SinonSandbox;
    let places: sasaki.service.Place;

    before(() => {
        const auth = new StubAuthClient();
        places = new sasaki.service.Place({
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

    it('劇場検索の結果が期待通り', async () => {
        const data: any[] = [];
        sandbox.mock(places).expects('fetch').once().resolves(data);

        const result = await places.searchMovieTheaters({
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('枝番号で劇場情報取得の結果が期待通り', async () => {
        const data = {
            branchCode: 'xxx'
        };
        sandbox.mock(places).expects('fetch').once().resolves(data);

        const result = await places.findMovieTheater({
            branchCode: data.branchCode
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
