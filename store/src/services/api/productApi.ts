import Client from './client';
import { QueryParam } from '@commercetools/platform-sdk';

const client = new Client();

export async function getProducts() {
    client.buildWithCredentialsFlow();
    const apiRoot = client.getApiRoot();
    const result = await apiRoot
        .products()
        .get({ queryArgs: { limit: 100 } })
        .execute();
    return result;
}
export async function getProduct(productID: string) {
    client.buildWithCredentialsFlow();
    const apiRoot = client.getApiRoot();
    const result = await apiRoot.products().withId({ ID: productID }).get().execute();
    return result;
}

export async function sortingProducts(query: { [key: string]: QueryParam }) {
    const apiRoot = client.getApiRoot();
    const result = apiRoot.productProjections().search().get({ queryArgs: query }).execute();
    return result;
}
