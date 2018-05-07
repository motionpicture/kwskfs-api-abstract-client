import * as factory from '@motionpicture/kwskfs-factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../service';

export type IEvent<T> =
    T extends factory.eventType.FoodEvent ? factory.event.food.IEvent :
    T extends factory.eventType.SportsEvent ? factory.event.sports.IEvent :
    factory.event.IEvent;

/**
 * イベントタイプによる販売情報インターフェース
 */
export declare type IOfferByEventType<T> =
    T extends factory.eventType.FoodEvent ? factory.organization.restaurant.IOrganization :
    any;

/**
 * イベントサービス
 */
export class EventService extends Service {
    /**
     * イベント検索
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async search<T extends factory.eventType>(
        /**
         * 検索条件
         */
        params: {
            eventType: T;
            identifiers: string[];
            limit: number;
        }
    ): Promise<IEvent<T>[]> {
        return this.fetch({
            uri: `/events/${params.eventType}`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 特定イベントの販売情報を検索する
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async searchOffers<T extends factory.eventType>(params: {
        /**
         * イベントタイプ
         */
        eventType: T;
        /**
         * イベント識別子
         */
        eventIdentifier: string;
    }): Promise<IOfferByEventType<T>[]> {
        return this.fetch({
            uri: `/events/${params.eventType}/${params.eventIdentifier}/offers`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 特定イベントの特定販売情報に対して、在庫状況を更新する
     * 管理者権限が必要です。
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async changeMenuItemOfferAvailability(params: {
        /**
         * イベントタイプ
         */
        eventType: factory.eventType;
        /**
         * イベント識別子
         */
        eventIdentifier: string;
        /**
         * メニューアイテムを提供する組織ID
         */
        organizationId: string;
        /**
         * メニューアイテム識別子
         */
        menuItemIdentifier: string;
        /**
         * オファー識別子
         */
        offerIdentifier: string;
        /**
         * 在庫状況
         */
        availability: factory.itemAvailability;
    }): Promise<void> {
        return this.fetch({
            // tslint:disable-next-line:max-line-length
            uri: `/events/${params.eventType}/${params.eventIdentifier}/offers/${params.organizationId}/menuItem/${params.menuItemIdentifier}/${params.offerIdentifier}/availability/${params.availability}`,
            method: 'PUT',
            qs: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
