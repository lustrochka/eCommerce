import Client from './client';

const client = new Client();

export async function getProducts() {
    client.buildWithCredentialsFlow();
    const apiRoot = client.getApiRoot();
    const result = await apiRoot
        .products()
        .get({ queryArgs: { limit: 10 } })
        .execute();
    return result;
}
export async function getProduct(productID: string) {
    client.buildWithCredentialsFlow();
    const apiRoot = client.getApiRoot();
    const result = await apiRoot.products().withId({ ID: productID }).get().execute();
    return result;
}
