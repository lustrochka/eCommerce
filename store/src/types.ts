import { Address } from '@commercetools/platform-sdk';
import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

export type Items = {
    [key: string]: string;
};

export type InputsType = { name: string; attributes: Items; msg: string; key?: string };

export type CodesType = {
    [key: string]: { pattern: string; placeholder: string };
};

export type AddressDataType = {
    data: Address;
    id?: string;
    billing?: boolean;
    shipping?: boolean;
    defaultBilling?: boolean;
    defaultShipping?: boolean;
};

export type ChangeAddressActions =
    | 'addShippingAddressId'
    | 'addBillingAddressId'
    | 'removeShippingAddressId'
    | 'removeBillingAddressId';

export interface Product {
    title: string;
    description: string;
    price: string;
    discount: string;
    picture: string;
}

export interface Trash {
    id: string;
    productId: string;
}
