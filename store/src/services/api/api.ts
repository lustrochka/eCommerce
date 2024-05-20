import Client from './client';
import { CustomerDraft } from '@commercetools/platform-sdk';

const client = new Client();

export async function createCustomer(data: CustomerDraft) {
    client.buildWithCredentialsFlow();
    const apiRoot = client.getApiRoot();
    const result = await apiRoot
        .customers()
        .post({
            body: data,
        })
        .execute();
    return result;
}

export async function getUserEmail(mail: string) {
    client.buildWithCredentialsFlow();
    const apiRoot = client.getApiRoot();
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
    client.buildWithPasswordFlow(mail, password);
    const apiRoot = client.getApiRoot();
    const result = await apiRoot
        .me()
        .login()
        .post({
            body: {
                email: mail,
                password: password,
            },
        })
        .execute();
    return result;
}
