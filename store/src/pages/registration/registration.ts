import Component from '../../components/component/component';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import { div } from '../../components/tags/tags';
import Address from './adress';
import Button from '../../components/button/button';
import './style.css';
import { Items } from '../../types';

const INPUTS: { name: string; attributes: Items }[] = [
    {
        name: 'Email',
        attributes: { id: 'Email', placeholder: 'example@email.com', pattern: '[^@\\s]+@[^@\\s]+\\.[^@\\s]+' },
    },
    {
        name: 'Password',
        attributes: {
            id: 'password',
            placeholder: '1aZ*2bA+',
            type: 'password',
            pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^ws]).{8,}',
        },
    },
    {
        name: 'First name',
        attributes: { id: 'first-name', placeholder: 'Alex', pattern: '[A-Za-z]+' },
    },
    {
        name: 'Last name',
        attributes: { id: 'last-name', placeholder: 'Adamovich', pattern: '[A-Za-z]+' },
    },
    {
        name: 'Date of birth',
        attributes: { id: 'birth', type: 'Date' },
    },
];

class Registration extends Component<HTMLFormElement> {
    #submitBtn;

    constructor() {
        super('form', 'registration');
        const title = div('registration__title');
        title.changeText('Registration');
        this.appendChildren(title);
        INPUTS.forEach((input) =>
            this.appendChildren(
                new Label('registration__label', input.name, { for: input.attributes?.id || '' }),
                new Input('registration__input', input.attributes, true)
            )
        ),
            (this.#submitBtn = new Button('registration__button button', 'Register', {
                type: 'button',
                disabled: 'true',
            }));
        this.appendChildren(
            div('registration__addresses', new Address('Shipping'), new Address('Billing')),
            this.#submitBtn
        );
        this.setListener('input', (event) => {
            if (event.target && event.target instanceof HTMLInputElement) this.checkFormValidity(event.target);
        });
        this.setListener('change', (event) => {
            if (event.target && event.target instanceof HTMLSelectElement) this.checkFormValidity(event.target);
        });
    }

    checkFormValidity(target: HTMLInputElement | HTMLSelectElement) {
        if (target.id === 'birth') {
            this.checkAge(target.value) ? target.setCustomValidity('') : target.setCustomValidity('a');
        }
        this.getNode().checkValidity()
            ? this.#submitBtn.deleteAttribute('disabled')
            : this.#submitBtn.addAttributes({ disabled: 'true' });
    }

    checkAge(value: string) {
        const now = new Date();
        const birthDate = new Date(value);
        if (now.getFullYear() - birthDate.getFullYear() === 13) {
            if (now.getMonth() > birthDate.getMonth()) {
                return true;
            } else if (now.getMonth() === birthDate.getMonth()) {
                if (now.getDate() >= birthDate.getDate()) {
                    return true;
                }
            }
        }
        return now.getFullYear() - birthDate.getFullYear() > 13;
    }
}

export default Registration;
