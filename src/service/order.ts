import * as factory from '@motionpicture/kwskfs-factory';
import { OK } from 'http-status';

import { Service } from '../service';

/**
 * 注文サービス
 */
export class OrderService extends Service {
    /**
     * 注文を検索する
     */
    public async search(
        params: factory.order.ISearchConditions
    ): Promise<factory.order.IOrder[]> {
        return this.fetch({
            uri: '/orders',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }
}
