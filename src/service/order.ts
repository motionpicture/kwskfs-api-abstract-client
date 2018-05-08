import * as factory from '@motionpicture/kwskfs-factory';
import { NO_CONTENT, OK } from 'http-status';

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

    /**
     * 注文ステータスを配送済に変更する
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async deliver(params: {
        orderNumber: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/orders/${params.orderNumber}/orderStatus/delivered`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
