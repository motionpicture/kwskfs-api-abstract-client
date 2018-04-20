/**
 * 組織サービス
 *
 * @namespace service.organization
 */

import * as factory from '@motionpicture/kwskfs-factory';
import { OK } from 'http-status';

import { Service } from '../service';

/**
 * organization service
 */
export class OrganizationService extends Service {
    /**
     * 劇場組織検索
     */
    public async searchMovieTheaters(
        /**
         * 検索条件
         */
        params?: {}
    ): Promise<factory.organization.movieTheater.IPublicFields[]> {
        return this.fetch({
            uri: '/organizations/movieTheater',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 枝番号で劇場組織検索
     */
    public async findMovieTheaterByBranchCode(params: {
        /**
         * 枝番号
         */
        branchCode: string;
    }): Promise<factory.organization.movieTheater.IPublicFields> {
        return this.fetch({
            uri: `/organizations/movieTheater/${params.branchCode}`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }

    /**
     * レストラン検索
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async searchRestaurants(
        /**
         * 検索条件
         */
        params?: {}
    ): Promise<IRestaurantOrganization[]> {
        return this.fetch({
            uri: '/organizations/restaurant',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }

    /**
     * レストラン注文検索
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async searchRestaurantOrders(params: {
        identifier: string;
    }): Promise<IRestaurantOrder[]> {
        return this.fetch({
            uri: `/organizations/restaurant/${params.identifier}/orders`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
}

/**
 * メニューインターフェース
 */
export interface IMenu {
    typeOf: 'Menu';
    hasMenuSection: IMenuSection[];
}
/**
 * メニューセクションインターフェース
 */
export interface IMenuSection {
    typeOf: 'MenuSection';
    name: string;
    description: string;
    image: string[];
    hasMenuItem: IMenuItem[];
}
/**
 * メニューアイテムインターフェース
 */
export interface IMenuItem {
    identifier: string;
    typeOf: 'MenuItem';
    name: string;
    description: string;
    offers: IMenuItemOffer[];
}
/**
 * メニューアイテムに対するオファーインターフェース
 */
export interface IMenuItemOffer {
    identifier: string;
    typeOf: 'Offer';
    price: number;
    priceCurrency: factory.priceCurrency;
    offeredBy?: {
        typeOf: 'Restaurant';
        identifier: string;
        name: string;
        telephone: string;
        url: string;
        image: string;
    };
}
/**
 * レストラン組織インターフェース
 */
export interface IRestaurantOrganization {
    typeOf: 'Restaurant';
    identifier: string;
    aggregateRating: {
        typeOf: 'AggregateRating';
        ratingValue: number;
        reviewCount: number;
    };
    name: string;
    openingHours: any[];
    telephone: string;
    url: string;
    image: string;
    hasMenu: IMenu[];
}

/**
 * 配送イベントインターフェス
 */
export interface IDeliveryEvent { typeOf: 'DeliveryEvent'; }
/**
 * チケットに割り当てられるアイテムインターフェース
 */
export interface ITicketedItem {
    typeOf: 'OrderItem';
    orderQuantity: number;
    orderedItem: IMenuItem;
}
/**
 * 予約チケットインターフェース
 */
export interface IReservedTicket {
    typeOf: 'Ticket';
    ticketToken: string;
    ticketedItem: ITicketedItem[];
}
/**
 * 配送イベント予約インターフェース
 */
export type IDeliveryEventReservation = factory.reservation.event.IEventReservation<any> & {
    /**
     * サービス提供者
     */
    provider: IRestaurantOrganization;
    /**
     * 予約対象
     */
    reservationFor: IDeliveryEvent;
    /**
     * 予約チケット内容
     */
    reservedTicket: IReservedTicket;
};
/**
 * レストラン注文で提供されるアイテムインターフェース
 */
export type IRestaurantOrderItemOffered = factory.order.IItemOffered & {
    itemOffered: IDeliveryEventReservation;
};
/**
 * レストランで受け入れられたオファーインターフェース
 */
export type IRestaurantOrderOffer = factory.order.IOffer & {
    itemOffered: IRestaurantOrderItemOffered;
};
/**
 * レストラン注文インターフェース
 */
export type IRestaurantOrder = factory.order.IOrder & {
    acceptedOffers: IRestaurantOrderOffer;
};
