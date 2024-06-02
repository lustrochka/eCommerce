import Address from '../../components/address/address';
import ModalProfile from './modalProfile';
import Button from '../../components/button/button';
import { addAddress, changeAddress } from '../../services/api/api';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import { div } from '../../components/tags/tags';
import { AddressDataType } from '../../types';

class ModalAddress extends ModalProfile {
    #isBilling;

    #isShipping;

    #id;

    constructor(values?: AddressDataType) {
        super('Add address');

        this.#isBilling = new Input('modal-checkbox', { id: 'billing', type: 'checkbox' }, false);
        this.#isShipping = new Input('modal-checkbox', { id: 'shipping', type: 'checkbox' }, false);
        this.#id = values?.id;

        const submitBtn = new Button('edit-modal__button button address-button', 'Save', { type: 'button' }, () =>
            values ? this.sendChangingData() : this.sendAddingData()
        );

        if (!values) submitBtn.addAttributes({ disabled: 'true' });

        const address = new Address();
        if (values) {
            address.setCurrentValues(values);
            address.changeCodePattern();
        }

        this._form.appendChildren(
            address,
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

    sendAddingData() {
        addAddress({
            street: this._form.getElementValue(1),
            city: this._form.getElementValue(2),
            code: this._form.getElementValue(3),
            country: Address.COUNTRY_CODES[this._form.getElementValue(4)],
        }).then(() => window.location.reload());
    }

    sendChangingData() {
        changeAddress({
            street: this._form.getElementValue(1),
            city: this._form.getElementValue(2),
            code: this._form.getElementValue(3),
            country: Address.COUNTRY_CODES[this._form.getElementValue(4)],
            id: this.#id || '',
        }).then(() => window.location.reload());
    }
}

export default ModalAddress;
