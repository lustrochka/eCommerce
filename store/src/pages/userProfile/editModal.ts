import Input from '../../components/input/input';
import Label from '../../components/label/label';
import { span } from '../../components/tags/tags';
import Button from '../../components/button/button';
import { Customer } from '@commercetools/platform-sdk';
import INPUTS from '../registration/inputs';
import { updateUser } from '../../services/api/api';
import ModalProfile from './modalProfile';

class EditModal extends ModalProfile {
    #submitBtn;

    constructor(data: Pick<Customer, 'firstName' | 'lastName' | 'dateOfBirth' | 'email'>) {
        super('Edit profile');

        Object.entries(data).forEach(([key, value]) => {
            const name = INPUTS.filter((x) => x.key === key)[0];
            this._form.appendChildren(
                new Label('edit-modal__label', name.name, { for: name.attributes?.id || '' }),
                new Input('edit-modal__input', { ...name.attributes, value: value }, true),
                span('edit-modal__error-msg', name.msg)
            );
        });
        this.#submitBtn = new Button(
            'edit-modal__button button',
            'Save',
            {
                type: 'button',
            },
            () => this.sendUpdateData()
        );
        this._form.appendChildren(
            new Button('close-button button', '✕', { type: 'button' }, () => this.destroy()),
            this.#submitBtn
        );

        this.setListener('input', (event) => {
            if (event.target && event.target instanceof HTMLInputElement)
                this._form.checkFormValidity(event.target, this.#submitBtn.getNode());
        });
    }

    sendUpdateData() {
        updateUser({
            firstName: this._form.getElementValue(1),
            lastName: this._form.getElementValue(2),
            birthDate: this._form.getElementValue(3),
            email: this._form.getElementValue(4),
        }).then(() => window.location.reload());
    }
}

export default EditModal;
