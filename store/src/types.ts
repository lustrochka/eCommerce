import { Address } from '@commercetools/platform-sdk';

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

<<<<<<< HEAD
=======
export type ChangeAddressActions =
    | 'addShippingAddressId'
    | 'addBillingAddressId'
    | 'removeShippingAddressId'
    | 'removeBillingAddressId';

>>>>>>> 20eb5715b49ed2f3b27876f71d2e01c0dac492e2
export interface Product {
    title: string;
    description: string;
    price: string;
    discount: string;
    picture: string;
}
