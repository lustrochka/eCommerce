export type Items = {
    [key: string]: string;
};

export type InputsType = { name: string; attributes: Items; msg: string };

export type CodesType = {
    [key: string]: { pattern: string; placeholder: string };
};
