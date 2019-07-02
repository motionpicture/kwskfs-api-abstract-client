import * as factory from '@motionpicture/kwskfs-factory';
import { CREATED, OK } from 'http-status';

import { Service } from '../service';

export type ICheckInAction = factory.action.interact.communicate.checkIn.IAction;

/**
 * 所有権サービス
 */
export class OwnershipInfoService extends Service {
    /**
     * チケットトークンでチェックインアクションを実行する
     */
    public async checkInByTicketToken<T extends factory.ownershipInfo.IGoodType>(params: {
        goodType: T;
        ticketToken: string;
    }): Promise<ICheckInAction> {
        return this.fetch({
            uri: `/ownershipInfos/${params.goodType}/${params.ticketToken}/actions/checkIn`,
            method: 'POST',
            expectedStatusCodes: [CREATED]
        });
    }

    /**
     * チケットトークンからチェックインアクションを検索する
     */
    public async searchCheckInActions<T extends factory.ownershipInfo.IGoodType>(
        params: {
            goodType: T;
            ticketToken: string;
        }): Promise<ICheckInAction[]> {
        return this.fetch({
            uri: `/ownershipInfos/${params.goodType}/${params.ticketToken}/actions/checkIn`,
            method: 'GET',
            expectedStatusCodes: [OK]
        });
    }
}
