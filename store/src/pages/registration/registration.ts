import Input from '../../components/input/input';
import Label from '../../components/label/label';
import { div, span } from '../../components/tags/tags';
import Address from './adress';
import Button from '../../components/button/button';
import Form from '../../components/form/form';
import Modal from '../../components/modalError/modal';
import { createCustomer } from '../../services/api/api';
import { locationResolver } from '../../components/event/locationResolver';
import Client from '../../services/api/client';
import INPUTS from './inputs';
import { CustomerDraft } from '@commercetools/platform-sdk';
import './style.css';
import { saveToStorage } from '../../services/storage/storage';
import { checkAge } from '../../services/checkAge';

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
            this.#submitBtn,
            new Button(
                'registration__button button',
                'Login',
                {
                    type: 'button',
                },
                () => locationResolver('/login')
            )
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
        this.checkFormValidity(target, this.#submitBtn.getNode());
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

        const body: CustomerDraft = {
            email: this.getElementValue(0),
            password: this.getElementValue(1),
            firstName: this.getElementValue(2),
            lastName: this.getElementValue(3),
            dateOfBirth: this.getElementValue(4),
            addresses: adressArray,
            shippingAddresses: [0],
            billingAddresses: billingIndex,
        };

        if (this.#billingAddress.getIsDefaultSet()) Object.assign(body, { defaultBillingAddress: billingIndex[0] });
        if (this.#shippingAddress.getIsDefaultSet()) Object.assign(body, { defaultShippingAddress: 0 });

        createCustomer(body)
            .then(() => {
                locationResolver('/');
                new Client().buildWithPasswordFlow(this.getElementValue(0), this.getElementValue(1));
            })
            .catch((error) => document.body.appendChild(new Modal(error.message).getNode()));
        saveToStorage('eComData', body);
    }
}

export default Registration;
