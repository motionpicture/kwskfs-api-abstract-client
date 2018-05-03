/**
 * 注文取引サービス
 */

import * as factory from '@motionpicture/kwskfs-factory';
import { CREATED, NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

/**
 * クレジットカード承認アクションに必要なクレジットカード情報インターフェース
 */
export type ICreditCard =
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardRaw |
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized |
    factory.paymentMethod.paymentCard.creditCard.IUnauthorizedCardOfMember;

/**
 * 承認アクションインターフェース
 */
export interface IAuthorizeAction {
    id: string;
}

/**
 * 注文取引サービス
 */
export class PlaceOrderTransactionService extends Service {
    /**
     * 取引を開始する
     * 開始できない場合(混雑中など)、nullが返されます。
     * @returns 取引オブジェクト
     */
    public async start(params: {
        /**
         * 取引期限
         * 指定した日時を過ぎると、取引を進行することはできなくなります。
         */
        expires: Date;
        /**
         * 販売者ID
         */
        sellerId: string;
        /**
         * WAITER許可証トークン
         * 指定しなければ、バックエンドで許可証を発行しにいく
         */
        passportToken?: string;
    }): Promise<factory.transaction.placeOrder.ITransaction> {
        return this.fetch({
            uri: '/transactions/placeOrder/start',
            method: 'POST',
            body: {
                expires: params.expires,
                sellerId: params.sellerId,
                passportToken: params.passportToken
            },
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 取引に座席予約を追加する
     * @returns 座席予約承認アクション
     */
    public async createSeatEventReservationAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * イベントタイプ
         */
        eventType: factory.eventType;
        /**
         * イベント識別子
         */
        eventIdentifier: string;
    }): Promise<factory.action.authorize.offer.eventReservation.seat.IAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/offer/eventReservation/seat`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                eventType: params.eventType,
                eventIdentifier: params.eventIdentifier
            }
        });
    }

    /**
     * 座席予約取消
     */
    public async cancelSeatEventReservationAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/offer/eventReservation/seat/${params.actionId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * クレジットカードのオーソリを取得する
     * @returns 承認アクション
     */
    public async createCreditCardAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * オーダーID
         */
        orderId: string;
        /**
         * 金額
         */
        amount: number;
        /**
         * 支払い方法
         */
        method: string;
        /**
         * クレジットカード情報
         */
        creditCard: ICreditCard;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/creditCard`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                orderId: params.orderId,
                amount: params.amount,
                method: params.method,
                creditCard: params.creditCard
            }
        });
    }

    /**
     * クレジットカードオーソリ取消
     */
    public async cancelCreditCardAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/creditCard/${params.actionId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * Pecorino口座のオーソリを取得する
     * @returns 承認アクション
     */
    public async createPecorinoAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * 金額
         */
        price: number;
        /**
         * 引き出し元口座ID
         */
        fromAccountId: string;
        /**
         * 取引メモ
         */
        notes?: string;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/pecorino`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                price: params.price,
                fromAccountId: params.fromAccountId,
                notes: params.notes
            }
        });
    }

    /**
     * メニューアイテムに対して承認アクションを作成する
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async createMenuItemEventReservationAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        eventType: factory.eventType;
        eventIdentifier: string;
        /**
         * メニューアイテムID
         */
        menuItemIdentifier: string;
        /**
         * 販売情報ID
         */
        offerIdentifier: string;
        /**
         * 数量
         */
        acceptedQuantity: number;
        /**
         * 組織識別子
         */
        organizationIdentifier: string;
    }): Promise<factory.action.authorize.offer.eventReservation.menuItem.IAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/offer/eventReservation/menuItem`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                menuItemIdentifier: params.menuItemIdentifier,
                eventType: params.eventType,
                eventIdentifier: params.eventIdentifier,
                offerIdentifier: params.offerIdentifier,
                acceptedQuantity: params.acceptedQuantity,
                organizationIdentifier: params.organizationIdentifier
            }
        });
    }

    /**
     * register a customer contact
     * @returns 登録された購入者情報
     */
    public async setCustomerContact(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * customer contact info
         */
        contact: factory.transaction.placeOrder.ICustomerContact;
    }): Promise<factory.transaction.placeOrder.ICustomerContact> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/customerContact`,
            method: 'PUT',
            expectedStatusCodes: [CREATED],
            body: params.contact
        });
    }

    /**
     * 取引確定
     * @returns 作成された注文
     */
    public async confirm(params: {
        /**
         * 取引ID
         */
        transactionId: string;
    }): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/confirm`,
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
            uri: `/transactions/placeOrder/${params.transactionId}/cancel`,
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
