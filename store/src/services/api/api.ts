import { apiRoot } from './client';
import { CustomerDraft } from '@commercetools/platform-sdk';

export async function createCustomer(data: CustomerDraft) {
    const result = await apiRoot
        .customers()
        .post({
            body: data,
        })
        .execute();
    return result;
}
