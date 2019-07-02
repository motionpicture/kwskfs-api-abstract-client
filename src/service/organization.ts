/**
 * 組織サービス
 */

import * as factory from '@motionpicture/kwskfs-factory';
import { OK } from 'http-status';

import { Service } from '../service';

export type IOrganization<T> =
    T extends factory.organizationType.Restaurant ? factory.organization.restaurant.IOrganization :
    factory.organization.IOrganization;

/**
 * 組織サービス
 */
export class OrganizationService extends Service {
    /**
     * 組織検索
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async search<T extends factory.organizationType>(
        /**
         * 検索条件
         */
        params: {
            organizationType: T;
            identifiers: string[];
            limit: number;
        }
    ): Promise<IOrganization<T>[]> {
        return this.fetch({
            uri: `/organizations/${params.organizationType}`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }
}
