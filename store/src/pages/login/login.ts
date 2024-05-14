import { InputsType } from '../../types';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import { div, span } from '../../components/tags/tags';
import Button from '../../components/button/button';
import Form from '../../components/form/form';
import './style.css';

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
];

class Login extends Form {
    #submitBtn;

    constructor() {
        super('login');
        const title = div('login__title');
        title.changeText('Login');
        this.appendChildren(title);
        INPUTS.forEach((input) =>
            this.appendChildren(
                new Label('login__label', input.name, { for: input.attributes?.id || '' }),
                new Input('login__input', input.attributes, true),
                span('login__error-msg', input.msg)
            )
        );
        this.#submitBtn = new Button(
            'login__button button',
            'Sign in',
            {
                type: 'button',
                disabled: 'true',
            },
            () => console.log('ok')
        );
        this.appendChildren(this.#submitBtn);
        this.setListener('input', (event) => {
            if (event.target && event.target instanceof HTMLInputElement) this.onChange(event.target);
        });
    }

    onChange(target: HTMLInputElement) {
        this.checkFormValidity(target);
    }

    checkFormValidity(target: HTMLInputElement | HTMLSelectElement) {
        if (target.nextElementSibling instanceof HTMLSpanElement) {
            target.checkValidity()
                ? target.nextElementSibling.classList.remove('visible')
                : target.nextElementSibling.classList.add('visible');
        }
        this.getNode().checkValidity()
            ? this.#submitBtn.deleteAttribute('disabled')
            : this.#submitBtn.addAttributes({ disabled: 'true' });
    }
}

export default Login;
