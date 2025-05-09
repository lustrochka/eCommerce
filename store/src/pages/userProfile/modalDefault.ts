import ModalProfile from './modalProfile';
import Label from '../../components/label/label';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import { div } from '../../components/tags/tags';
import { setDefaultAddress } from '../../services/api/api';

class ModalDefault extends ModalProfile {
    #isBilling;

    #isShipping;

    #id;

    constructor(id?: string, currentBilling?: boolean, currentShipping?: boolean) {
        super('Set default');

        this.#isBilling = currentBilling || false;
        this.#isShipping = currentShipping || false;
        this.#id = id;

        const submitBtn = new Button(
            'edit-modal__button button',
            'Save',
            {
                type: 'button',
            },
            () => this.sendData()
        );

        if (!currentBilling)
            this._form.appendChildren(
                div(
                    'edit-modal__item',
                    new Label('', 'Set default billing', { for: 'default-billing' }),
                    new Input(
                        '',
                        { id: 'default-billing', type: 'checkbox' },
                        false,
                        () => (this.#isBilling = !this.#isBilling)
                    )
                )
            );

        if (!currentShipping)
            this._form.appendChildren(
                div(
                    'edit-modal__item',
                    new Label('', 'Set default shipping', { for: 'default-shipping' }),
                    new Input(
                        '',
                        { id: 'default-shipping', type: 'checkbox' },
                        false,
                        () => (this.#isShipping = !this.#isShipping)
                    )
                )
            );

        this._form.appendChildren(submitBtn);
    }

    sendData() {
        const actions: ('setDefaultShippingAddress' | 'setDefaultBillingAddress')[] = [];
        if (this.#isBilling) actions.push('setDefaultBillingAddress');
        if (this.#isShipping) actions.push('setDefaultShippingAddress');
        if (actions.length > 0 && this.#id) setDefaultAddress(actions, this.#id).then(() => window.location.reload());
    }
}

export default ModalDefault;
