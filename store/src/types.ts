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
    billing?: boolean;
    shipping?: boolean;
    defaultBilling?: boolean;
    defaultShipping?: boolean;
};

export interface Product {
    title: string;
    description: string;
    price: string;
    discount: string;
    picture: string;
}
