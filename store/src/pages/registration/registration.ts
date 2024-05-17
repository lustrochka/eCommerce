import Component from '../../components/component/component';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import { div, span } from '../../components/tags/tags';
import Address from './adress';
import Button from '../../components/button/button';
import Form from '../../components/form/form';
import { createCustomer } from '../../services/api/api';
import INPUTS from './inputs';
import './style.css';
import { saveToStorage } from '../../services/storage/storage';

class Registration extends Form {
    #submitBtn;

    #shippingAddress;

    #billingAddress;

    #isChecked;

    constructor() {
        super('registration');
        this.#isChecked = false;
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
        this.#shippingAddress = new Address('Shipping');
        this.#billingAddress = new Address('Billing');
        this.#submitBtn = new Button(
            'registration__button button',
            'Register',
            {
                type: 'button',
                disabled: 'true',
            },
            () => this.register()
        );
        this.appendChildren(
            div('registration__addresses', this.#shippingAddress, this.#billingAddress),
            this.#submitBtn
        );
        this.setListener('input', (event) => {
            if (event.target && event.target instanceof HTMLInputElement) this.onChange(event.target);
        });
        this.setListener('change', (event) => {
            if (event.target && event.target instanceof HTMLSelectElement) this.onChange(event.target);
        });
    }

    onChange(target: HTMLInputElement | HTMLSelectElement) {
        if (target.id === 'common' && target instanceof HTMLInputElement) {
            this.#isChecked = !!target.checked;
            !!target.checked
                ? this.#billingAddress.setValues(this.#shippingAddress.getValues())
                : this.#billingAddress.setInputsWritable();
        } else if (this.#isChecked && target.closest('#shipping-address')) {
            this.#billingAddress.setValue(target.name, target.value);
        }
        this.checkFormValidity(target);
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

    register() {
        let billingIndex = [0];
        const shippingAdress = this.#shippingAddress.getAddress();
        const billingAdress = this.#billingAddress.getAddress();
        const adressArray = [shippingAdress];

        if (!this.#isChecked) {
            adressArray.push(billingAdress);
            billingIndex = [1];
        }

        const body = {
            email: this.getElementValue(0),
            password: this.getElementValue(1),
            firstName: this.getElementValue(2),
            lastName: this.getElementValue(3),
            dateOfBirth: this.getElementValue(4),
            addresses: adressArray,
            shippingAddresses: [0],
            billingAddresses: billingIndex,
        };

        createCustomer(body);
        saveToStorage('eComData', body);
    }
}

export default Registration;
