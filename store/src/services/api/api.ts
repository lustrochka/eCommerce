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

export async function getUserEmail(mail: string) {
    const result = await apiRoot
        .customers()
        .get({
            queryArgs: {
                where: `email="${mail}"`,
            },
        })
        .execute();
    return result;
}

export async function getUser(mail: string, password: string) {
    const result = await apiRoot
        .me()
        .login()
        .post({
            body: {
                email: `${mail}`,
                password: `${password}`,
            },
        })
        .execute();
    return result;
}
