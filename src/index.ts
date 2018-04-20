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
import { PersonService } from './service/person';
import { PlaceService } from './service/place';
import { PlaceOrderTransactionService } from './service/transaction/placeOrder';
import { ReturnOrderTransactionService } from './service/transaction/returnOrder';
import * as transporters from './transporters';

export import factory = factory;
export import transporters = transporters;

/**
 * auth client abstract class
 * 認証クライアント抽象クラス
 * @export
 */
export abstract class Auth extends AuthClient { }

export namespace service {
    /**
     * action service
     */
    export class Action extends ActionService { }
    /**
     * event service
     */
    export class Event extends EventService { }
    /**
     * order service
     */
    export class Order extends OrderService { }
    /**
     * organization service
     */
    export class Organization extends OrganizationService { }
    /**
     * person service
     */
    export class Person extends PersonService { }
    /**
     * place service
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
