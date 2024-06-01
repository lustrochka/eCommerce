import Address from '../../components/address/address';
import ModalProfile from './modalProfile';
import Button from '../../components/button/button';
import { addAddress } from '../../services/api/api';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import { div } from '../../components/tags/tags';

const COUNTRY_CODES: { [key: string]: string } = { Belarus: 'BY', Poland: 'PL' };

class ModalAddress extends ModalProfile {
    #isBilling;

    #isShipping;

    constructor() {
        super('Add address');

        this.#isBilling = new Input('modal-checkbox', { id: 'billing', type: 'checkbox' }, false);
        this.#isShipping = new Input('modal-checkbox', { id: 'shipping', type: 'checkbox' }, false);

        const submitBtn = new Button(
            'edit-modal__button button address-button',
            'Save',
            {
                type: 'button',
                disabled: 'true',
            },
            () => this.sendData()
        );

        this._form.appendChildren(
            new Address(),
            div(
                'modal-checkboxes',
                this.#isBilling,
                new Label('modal-label', 'Set as billing', { for: 'billing' }),
                this.#isShipping,
                new Label('modal-label', 'Set as shipping', { for: 'shipping' })
            ),
            submitBtn
        );

        this.setListener('input', (event) => {
            if (event.target && event.target instanceof HTMLInputElement)
                this._form.checkFormValidity(event.target, submitBtn.getNode());
        });

        this.setListener('change', (event) => {
            if (event.target && event.target instanceof HTMLSelectElement)
                this._form.checkFormValidity(event.target, submitBtn.getNode());
        });
    }

    sendData() {
        addAddress({
            street: this._form.getElementValue(1),
            city: this._form.getElementValue(2),
            code: this._form.getElementValue(3),
            country: COUNTRY_CODES[this._form.getElementValue(4)],
        }).then(() => window.location.reload());
    }
}

export default ModalAddress;
