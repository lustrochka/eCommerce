import Component from '../../components/component/component';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import Form from '../../components/form/form';
import { span, div } from '../../components/tags/tags';
import Button from '../../components/button/button';
import { Customer } from '@commercetools/platform-sdk';
import INPUTS from '../registration/inputs';
import { updateUser } from '../../services/api/api';
import { checkAge } from '../../services/checkAge';

const EDIT_FIELDS = [INPUTS[0], ...INPUTS.slice(2)];

class EditModal extends Component {
    #form;

    #submitBtn;

    constructor(data: Pick<Customer, 'firstName' | 'lastName' | 'dateOfBirth' | 'email'>) {
        super('div', 'edit-modal');
        this.#form = new Form('user-form');
        this.appendChildren(this.#form);

        const title = div('edit-modal__title');
        title.changeText('Edit profile');
        this.#form.appendChildren(title);

        Object.entries(data).forEach(([key, value]) => {
            const name = INPUTS.filter((x) => x.key === key)[0];
            this.#form.appendChildren(
                new Label('edit-modal__label', name.name, { for: name.attributes?.id || '' }),
                new Input('edit-modal__input', { ...name.attributes, value: value }, true),
                span('edit-modal__error-msg', name.msg)
            );
        });
        this.#submitBtn = new Button(
            'edit-modal__button button',
            'Save',
            {
                type: 'submit',
            },
            () => this.sendUpdateData()
        );
        this.#form.appendChildren(
            new Button('close-button button', '✕', { type: 'button' }, () => this.destroy()),
            this.#submitBtn
        );

        this.setListener('input', (event) => {
            if (event.target && event.target instanceof HTMLInputElement)
                this.#form.checkFormValidity(event.target, this.#submitBtn.getNode());
        });
    }

    sendUpdateData() {
        updateUser({
            firstName: this.#form.getElementValue(0),
            lastName: this.#form.getElementValue(1),
            birthDate: this.#form.getElementValue(2),
            email: this.#form.getElementValue(3),
        });
    }
}

export default EditModal;
