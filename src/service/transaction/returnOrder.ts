/**
 * 注文返品取引サービス
 */

import * as factory from '@motionpicture/kwskfs-factory';
import { CREATED, NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

/**
 * 注文返品取引サービス
 */
export class ReturnOrderTransactionService extends Service {
    /**
     * 取引を開始する
     * @returns 注文返品取引オブジェクト
     */
    public async start(params: {
        /**
         * 取引期限
         * 指定した日時を過ぎると、取引を進行することはできなくなります。
         */
        expires: Date;
        /**
         * 返品したい注文取引ID
         */
        transactionId: string;
    }): Promise<factory.transaction.returnOrder.ITransaction> {
        return this.fetch({
            uri: '/transactions/returnOrder/start',
            method: 'POST',
            body: {
                expires: params.expires,
                transactionId: params.transactionId
            },
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 取引確定
     * @returns 注文返品取引結果
     */
    public async confirm(params: {
        /**
         * 返品取引ID
         */
        transactionId: string;
    }): Promise<factory.transaction.returnOrder.IResult> {
        return this.fetch({
            uri: `/transactions/returnOrder/${params.transactionId}/confirm`,
            method: 'POST',
            expectedStatusCodes: [CREATED]
        });
    }

    /**
     * 明示的に取引を中止する
     * 既に確定済、あるいは、期限切れの取引に対して実行するとNotFoundエラーが返されます。
     * @param params.transactionId 取引ID
     */
    public async cancel(params: {
        transactionId: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/transactions/returnOrder/${params.transactionId}/cancel`,
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
