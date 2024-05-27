import Client from './client';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { Items } from '../../types';

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

export async function getUserData() {
    const apiRoot = client.getApiRoot();
    const result = await apiRoot.me().get().execute();
    return result;
}

export async function updateUser({ firstName, lastName, birthDate, email }: Items) {
    const version = Number(localStorage.getItem('version')) || 1;
    const apiRoot = client.getApiRoot();
    const result = await apiRoot
        .me()
        .post({
            body: {
                version,
                actions: [
                    {
                        action: 'setFirstName',
                        firstName: firstName,
                    },
                    {
                        action: 'setLastName',
                        lastName: lastName,
                    },
                    {
                        action: 'setDateOfBirth',
                        dateOfBirth: birthDate,
                    },
                    {
                        action: 'changeEmail',
                        email: email,
                    },
                ],
            },
        })
        .execute();
    return result;
}

export async function updatePassword(currentPassword: string, newPassword: string) {
    const version = Number(localStorage.getItem('version')) || 1;
    const id = localStorage.getItem('id') || '';
    const apiRoot = client.getApiRoot();
    const result = await apiRoot
        .customers()
        .password()
        .post({
            body: {
                version,
                id,
                currentPassword,
                newPassword,
            },
        })
        .execute();
    return result;
}
