import { apiRoot } from './client';
import { CustomerDraft } from '@commercetools/platform-sdk';

export async function createCustomer(array: CustomerDraft) {
    const result = await apiRoot
        .customers()
        .post({
            body: array,
        })
        .execute();
    return result;
}
