import Client from './client';
import { CustomerDraft, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { Items, ChangeAddressActions } from '../../types';

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

export async function addAddress({ street, code, city, country }: Items) {
    const version = Number(localStorage.getItem('version')) || 1;
    const apiRoot = client.getApiRoot();
    const result = await apiRoot
        .me()
        .post({
            body: {
                version,
                actions: [
                    {
                        action: 'addAddress',
                        address: {
                            streetName: street,
                            postalCode: code,
                            city: city,
                            country: country,
                        },
                    },
                ],
            },
        })
        .execute();
    return result;
}

export async function removeAddress(id: string) {
    const version = Number(localStorage.getItem('version')) || 1;
    const apiRoot = client.getApiRoot();
    const result = await apiRoot
        .me()
        .post({
            body: {
                version,
                actions: [
                    {
                        action: 'removeAddress',
                        addressId: id,
                    },
                ],
            },
        })
        .execute();
    return result;
}

export async function changeAddress({ street, code, city, country, id = '' }: Items, actions: ChangeAddressActions[]) {
    const version = Number(localStorage.getItem('version')) || 1;
    const apiRoot = client.getApiRoot();
    const actionsArray: MyCustomerUpdateAction[] = [
        {
            action: 'changeAddress',
            addressId: id,
            address: {
                streetName: street,
                postalCode: code,
                city: city,
                country: country,
            },
        },
    ];
    actions.forEach((action) => actionsArray.push({ action, addressId: id }));
    const result = await apiRoot
        .me()
        .post({
            body: {
                version,
                actions: actionsArray,
            },
        })
        .execute();
    return result;
}

export async function setAddressType(billing: boolean, shipping: boolean, id: string) {
    const version = Number(localStorage.getItem('version')) || 1;
    const apiRoot = client.getApiRoot();
    const actions: MyCustomerUpdateAction[] = [];
    if (billing) actions.push({ action: `addBillingAddressId`, addressId: id });
    if (shipping) actions.push({ action: `addShippingAddressId`, addressId: id });
    const result = await apiRoot
        .me()
        .post({
            body: {
                version,
                actions,
            },
        })
        .execute();
    return result;
}

export async function setDefaultAddress(
    type: ('setDefaultShippingAddress' | 'setDefaultBillingAddress')[],
    id: string
) {
    const version = Number(localStorage.getItem('version')) || 1;
    const apiRoot = client.getApiRoot();
    const actions = type.map((x) => ({ action: x, addressId: id }));
    const result = await apiRoot
        .me()
        .post({
            body: {
                version,
                actions,
            },
        })
        .execute();
    return result;
}

export async function getCarts() {
    const apiRoot = client.getApiRoot();
    const result = await apiRoot.me().carts().get().execute();
    return result;
}

export async function createCart() {
    const apiRoot = client.getApiRoot();
    const result = await apiRoot
        .me()
        .carts()
        .post({
            body: {
                currency: 'EUR',
            },
        })
        .execute();
    return result;
}

export async function addItem(productId: string, cartId: string, version: number) {
    const variantId = 1;
    const apiRoot = client.getApiRoot();
    const result = await apiRoot
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({
            body: {
                version,
                actions: [
                    {
                        action: 'addLineItem',
                        productId,
                        variantId,
                        quantity: 1,
                    },
                ],
            },
        })
        .execute();
    return result;
}
