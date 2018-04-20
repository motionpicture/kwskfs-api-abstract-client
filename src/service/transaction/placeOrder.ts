/**
 * 注文取引サービス
 * @namespace service.transaction.placeOrder
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
 * メニューアイテム承認アクションインターフェース
 */
export interface IMenuItemAuthorizeAction {
    typeOf: factory.actionType.AuthorizeAction;
    object: {
        identifier: string;
        typeOf: 'Offer';
        price: number;
        priceCurrency: factory.priceCurrency;
        offeredBy: {
            typeOf: 'Restaurant';
            name: string;
            telephone: string;
            url: string;
            image: string;
        };
        itemOffered: {
            identifier: string;
            typeOf: 'MenuItem';
            name: string;
            description: string;
        };
    };
    agent: any;
    recipient: any;
    purpose: factory.transaction.placeOrder.ITransaction;
    result: {
        price: number;
    };
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
    public async createSeatReservationAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * イベント識別子
         */
        eventIdentifier: string;
        /**
         * 座席販売情報
         */
        offers: factory.offer.seatReservation.IOffer[];
    }): Promise<factory.action.authorize.seatReservation.IAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/seatReservation`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                eventIdentifier: params.eventIdentifier,
                offers: params.offers
            }
        });
    }

    /**
     * 座席予約取消
     */
    public async cancelSeatReservationAuthorization(params: {
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
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/seatReservation/${params.actionId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 座席予約承認アクションの供給情報を変更する
     * 完了ステータスの座席仮予約に対して券種変更する際に使用
     * @returns 座席予約承認アクション
     */
    public async changeSeatReservationOffers(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * アクションID
         */
        actionId: string;
        /**
         * イベント識別子
         */
        eventIdentifier: string;
        /**
         * 座席販売情報
         */
        offers: factory.offer.seatReservation.IOffer[];
    }): Promise<factory.action.authorize.seatReservation.IAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/seatReservation/${params.actionId}`,
            method: 'PATCH',
            expectedStatusCodes: [OK],
            body: {
                eventIdentifier: params.eventIdentifier,
                offers: params.offers
            }
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
     * 決済方法として、ムビチケを追加する
     * @returns 承認アクション
     */
    public async createMvtkAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * ムビチケ情報
         */
        mvtk: factory.action.authorize.mvtk.IObject;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/mvtk`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.mvtk
        });
    }

    /**
     * ムビチケ取消
     */
    public async cancelMvtkAuthorization(params: {
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
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/mvtk/${params.actionId}`,
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
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/pecorino`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                price: params.price
            }
        });
    }

    /**
     * メニューアイテムに対して承認アクションを作成する
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async createMenuItemAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
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
    }): Promise<IMenuItemAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/menuItem`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                menuItemIdentifier: params.menuItemIdentifier,
                offerIdentifier: params.offerIdentifier,
                acceptedQuantity: params.acceptedQuantity
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
     * 確定した取引に関して、購入者にメール通知を送信する
     * @returns メール送信タスク
     */
    public async sendEmailNotification(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * Eメールメッセージ属性
         */
        emailMessageAttributes: factory.creativeWork.message.email.IAttributes;
    }): Promise<factory.task.sendEmailMessage.ITask> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/tasks/sendEmailNotification`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.emailMessageAttributes
        });
    }
}
