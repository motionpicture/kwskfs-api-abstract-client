import * as factory from '@motionpicture/kwskfs-factory';
import { CREATED, OK } from 'http-status';

import { Service } from '../service';

/**
 * action service
 */
export class ActionService extends Service {
    /**
     * チケット印刷
     */
    public async printTicket(
        /**
         * チケットオブジェクト
         */
        params: factory.action.transfer.print.ticket.ITicket
    ): Promise<factory.action.transfer.print.ticket.IAction> {
        return this.fetch({
            uri: '/actions/print/ticket',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        });
    }

    /**
     * チケット印刷アクション検索
     */
    public async searchPrintTicket(
        /**
         * 検索条件
         */
        params: factory.action.transfer.print.ticket.ISearchConditions
    ): Promise<factory.event.individualScreeningEvent.IEventWithOffer> {
        return this.fetch({
            uri: '/actions/print/ticket',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }
}
