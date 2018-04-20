// tslint:disable:no-implicit-dependencies

/**
 * person service test
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as sasaki from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('person service', () => {
    let sandbox: sinon.SinonSandbox;
    let people: sasaki.service.Person;

    before(() => {
        const auth = new StubAuthClient();
        people = new sasaki.service.Person({
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

    it('連絡先取得の結果が期待通り', async () => {
        const data = {};
        sandbox.mock(people).expects('fetch').once().resolves(data);
        const personId = 'me';

        const result = await people.getContacts({
            personId: personId
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('連絡先更新の結果が期待通り', async () => {
        const personId = 'me';
        const data = undefined;
        sandbox.mock(people).expects('fetch').once().resolves(data);

        const contacts = {
            givenName: 'xxx',
            familyName: 'xxx',
            telephone: 'xxx',
            email: 'xxx'
        };

        const result = await people.updateContacts({
            personId: personId,
            contacts: contacts
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカード検索の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        sandbox.mock(people).expects('fetch').once().resolves(data);

        const result = await people.findCreditCards({
            personId: personId
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカード追加の結果が期待通り', async () => {
        const personId = 'me';
        const creditCard = <any>{};
        const data = {};
        sandbox.mock(people).expects('fetch').once().resolves(data);

        const result = await people.addCreditCard({
            personId: personId,
            creditCard: creditCard
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカード削除の結果が期待通り', async () => {
        const personId = 'me';
        const cardSeq = 'xxx';
        const data = undefined;
        sandbox.mock(people).expects('fetch').once().resolves(data);

        const result = await people.deleteCreditCard({
            personId: personId,
            cardSeq: cardSeq
        });

        assert.deepEqual(result, undefined);
        sandbox.verify();
    });

    it('クレジットカード削除の結果が期待通り', async () => {
        const personId = 'me';
        const data = [{}];
        sandbox.mock(people).expects('fetch').once().resolves(data);

        const result = await people.searchReservationOwnerships({
            personId: personId
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('口座照会の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        sandbox.mock(people).expects('fetch').once().resolves(data);

        const result = await people.findAccount({
            personId: personId
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('口座取引履歴検索の結果が期待通り', async () => {
        const personId = 'me';
        const data = [{}];
        sandbox.mock(people).expects('fetch').once().resolves(data);

        const result = await people.searchAccountTradeActions({
            personId: personId
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
