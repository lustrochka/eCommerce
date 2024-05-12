import { InputsType } from '../../types';

const INPUTS: InputsType[] = [
    {
        name: 'Email',
        attributes: { id: 'Email', placeholder: 'example@email.com', pattern: '[^@\\s]+@[^@\\s]+\\.[^@\\s]+' },
        msg: 'A email address should be properly formatted (e.g., example@email.com)',
    },
    {
        name: 'Password',
        attributes: {
            id: 'password',
            placeholder: '1aZ*2bA+',
            type: 'password',
            pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^ws]).{8,}',
        },
        msg: 'Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    },
    {
        name: 'First name',
        attributes: { id: 'first-name', placeholder: 'Alex', pattern: '[A-Za-z]+' },
        msg: 'First name must contain at least one character and no special characters or numbers',
    },
    {
        name: 'Last name',
        attributes: { id: 'last-name', placeholder: 'Adamovich', pattern: '[A-Za-z]+' },
        msg: 'Last name must contain at least one character and no special characters or numbers',
    },
    {
        name: 'Date of birth',
        attributes: { id: 'birth', type: 'Date' },
        msg: 'You should have at least 13 years',
    },
];

export default INPUTS;
