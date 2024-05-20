import { InputsType } from '../../types';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import { div, span } from '../../components/tags/tags';
import Button from '../../components/button/button';
import Form from '../../components/form/form';
import { getUser, getUserEmail } from '../../services/api/api';
import Modal from '../../components/modalError/modal';
import { updatePage } from '../../components/event/updatePage';
import { saveToStorage } from '../../services/storage/storage';
import { locationResolver } from '../../components/event/locationResolver';
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

        this.appendChildren(
            new Button(
                'login__pass-button',
                '',
                {
                    type: 'button',
                },
                () => this.passClick()
            )
        );

        this.#submitBtn = new Button(
            'login__button button',
            'Sign in',
            {
                type: 'button',
                disabled: 'true',
            },
            () => this.getFetch()
        );
        this.appendChildren(this.#submitBtn);
        this.appendChildren(
            new Button(
                'login__button button',
                'Registration',
                {
                    type: 'button',
                },
                () => locationResolver('/registration')
            )
        );
        this.setListener('input', (event) => {
            if (event.target && event.target instanceof HTMLInputElement) this.checkFormValidity(event.target);
        });
    }

    passClick() {
        const input = document.querySelector('#password') as HTMLElement;
        (document.querySelector(`.login__pass-button`) as HTMLElement).classList.toggle('active');
        input.getAttribute('type') === 'password'
            ? input.setAttribute('type', 'text')
            : input.setAttribute('type', 'password');
    }

    checkFormValidity(target: HTMLInputElement) {
        if (target.nextElementSibling instanceof HTMLSpanElement) {
            target.checkValidity()
                ? target.nextElementSibling.classList.remove('visible')
                : target.nextElementSibling.classList.add('visible');
        }
        this.getNode().checkValidity()
            ? this.#submitBtn.deleteAttribute('disabled')
            : this.#submitBtn.addAttributes({ disabled: 'true' });
    }

    getFetch() {
        getUserEmail(this.getElementValue(0))
            .then(({ body }) => {
                if (body.results.length == 0) {
                    document.body.appendChild(new Modal('This email address has not been registered.').getNode());
                } else {
                    getUser(this.getElementValue(0), this.getElementValue(1))
                        .then(({ body }) => {
                            saveToStorage('eComData', body.customer);
                            locationResolver('/');
                            updatePage();
                        })
                        .catch(() => document.body.appendChild(new Modal('This password is incorrect.').getNode()));
                }
            })
            .catch((e) => document.body.appendChild(new Modal(e.message).getNode()));
    }
}

export default Login;
