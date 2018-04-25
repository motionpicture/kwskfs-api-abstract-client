import * as factory from '@motionpicture/kwskfs-factory';
import { OK } from 'http-status';

import { Service } from '../service';

export type IEvent<T> =
    T extends factory.eventType.FoodEvent ? factory.event.food.IEvent :
    T extends factory.eventType.SportsEvent ? factory.event.sports.IEvent :
    factory.event.IEvent;

/**
 * event service
 */
export class EventService extends Service {
    /**
     * 組織検索
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
}
