import Component from '../../components/component/component';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import { div, span } from '../../components/tags/tags';
import Address from './adress';
import Button from '../../components/button/button';
import INPUTS from './inputs';
import './style.css';

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
                new Input('registration__input', input.attributes, true),
                span('registration__error-msg', input.msg)
            )
        );
        this.#submitBtn = new Button('registration__button button', 'Register', {
            type: 'button',
            disabled: 'true',
        });
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
            this.checkAge(target.value) ? target.setCustomValidity('') : target.setCustomValidity('irrelevant age');
        }
        if (target.nextElementSibling instanceof HTMLSpanElement) {
            target.checkValidity()
                ? target.nextElementSibling.classList.remove('visible')
                : target.nextElementSibling.classList.add('visible');
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
