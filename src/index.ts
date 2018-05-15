// tslint:disable:max-classes-per-file
/**
 * Sasaki API Service Library for Javascript
 * @ignore
 */
import * as factory from '@motionpicture/kwskfs-factory';

import { AuthClient } from './auth/authClient';

import { ActionService } from './service/action';
import { EventService } from './service/event';
import { OrderService } from './service/order';
import { OrganizationService } from './service/organization';
import { OwnershipInfoService } from './service/ownershipInfo';
import { PersonService } from './service/person';
import { PlaceService } from './service/place';
import { PlaceOrderTransactionService } from './service/transaction/placeOrder';
import { ReturnOrderTransactionService } from './service/transaction/returnOrder';
import * as transporters from './transporters';

export import factory = factory;
export import transporters = transporters;

/**
 * 認証クライアント抽象クラス
 */
export abstract class Auth extends AuthClient { }

export namespace service {
    /**
     * アクションサービス
     */
    export class Action extends ActionService { }
    /**
     * イベントサービス
     */
    export class Event extends EventService { }
    /**
     * 注文サービス
     */
    export class Order extends OrderService { }
    /**
     * 組織サービス
     */
    export class Organization extends OrganizationService { }
    /**
     * 所有権サービス
     */
    export class OwnershipInfo extends OwnershipInfoService { }
    /**
     * 人物サービス
     */
    export class Person extends PersonService { }
    /**
     * 場所サービス
     */
    export class Place extends PlaceService { }
    export namespace transaction {
        /**
         * 注文取引サービス
         */
        export class PlaceOrder extends PlaceOrderTransactionService { }
        /**
         * 注文返品取引サービス
         */
        export class ReturnOrder extends ReturnOrderTransactionService { }
    }
}
