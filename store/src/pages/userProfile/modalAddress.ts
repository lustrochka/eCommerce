import Address from '../../components/address/address';
import ModalProfile from './modalProfile';
import Button from '../../components/button/button';
import { addAddress, changeAddress, setAddressType } from '../../services/api/api';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import { div } from '../../components/tags/tags';
import { AddressDataType, ChangeAddressActions } from '../../types';

class ModalAddress extends ModalProfile {
    #isBilling;

    #isShipping;

    #id;

    constructor(values?: AddressDataType) {
        super('Add address');
        this.#id = values?.id;
        this.#isBilling = values?.billing || false;
        this.#isShipping = values?.shipping || false;
        const wasBilling = values?.billing || false;
        const wasShipping = values?.shipping || false;

        const submitBtn = new Button('edit-modal__button button address-button', 'Save', { type: 'button' }, () =>
            values ? this.sendChangingData(wasBilling, wasShipping) : this.sendAddingData()
        );

        if (!values) submitBtn.addAttributes({ disabled: 'true' });

        const address = new Address();
        if (values) {
            address.setCurrentValues(values);
            address.changeCodePattern();
        }

        const billing: Input = new Input(
            'modal-checkbox',
            { id: 'billing', type: 'checkbox' },
            false,
            () => (this.#isBilling = billing.getNode().checked)
        );
        if (values?.billing) billing.getNode().checked = true;
        const shipping: Input = new Input(
            'modal-checkbox',
            { id: 'shipping', type: 'checkbox' },
            false,
            () => (this.#isShipping = shipping.getNode().checked)
        );
        if (values?.shipping) shipping.getNode().checked = true;

        this._form.appendChildren(
            address,
            div(
                'modal-checkboxes',
                billing,
                new Label('modal-label', 'Set as billing', { for: 'billing' }),
                shipping,
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
        }).then(({ body }) => {
            localStorage.setItem('version', body.version.toString());
            const id = body.addresses[body.addresses.length - 1].id;
            if (id && (this.#isBilling || this.#isShipping)) {
                setAddressType(this.#isBilling, this.#isShipping, id).then(() => window.location.reload());
            } else window.location.reload();
        });
    }

    sendChangingData(wasBilling: boolean, wasShipping: boolean) {
        const actions: ChangeAddressActions[] = [];
        if (this.#isBilling !== wasBilling)
            wasBilling ? actions.push('removeBillingAddressId') : actions.push('addBillingAddressId');
        if (this.#isShipping !== wasShipping)
            wasShipping ? actions.push('removeShippingAddressId') : actions.push('addShippingAddressId');
        changeAddress(
            {
                street: this._form.getElementValue(1),
                city: this._form.getElementValue(2),
                code: this._form.getElementValue(3),
                country: Address.COUNTRY_CODES[this._form.getElementValue(4)],
                id: this.#id || '',
            },
            actions
        ).then(() => window.location.reload());
    }
}

export default ModalAddress;
