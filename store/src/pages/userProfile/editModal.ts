import Component from '../../components/component/component';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import Form from '../../components/form/form';
import { span, div } from '../../components/tags/tags';
import Button from '../../components/button/button';
import { Customer } from '@commercetools/platform-sdk';
import INPUTS from '../registration/inputs';

const EDIT_FIELDS = [INPUTS[0], ...INPUTS.slice(2)];

class EditModal extends Component {
    constructor(data: Pick<Customer, 'firstName' | 'lastName' | 'dateOfBirth' | 'email'>) {
        super('div', 'edit-modal');
        const form = new Form('user-form');
        this.appendChildren(form);

        const title = div('edit-modal__title');
        title.changeText('Edit profile');
        form.appendChildren(title);

        Object.entries(data).forEach(([key, value]) => {
            const name = INPUTS.filter((x) => x.key === key)[0];
            form.appendChildren(
                new Label('edit-modal__label', name.name, { for: name.attributes?.id || '' }),
                new Input('edit-modal__input', { ...name.attributes, value: value }, true),
                span('edit-modal__error-msg', name.msg)
            );
        });
        const submitBtn = new Button('edit-modal__button button', 'Save', {
            type: 'submit',
        });
        form.appendChildren(
            new Button('close-button button', '✕', { type: 'button' }, () => this.destroy()),
            submitBtn
        );
    }
}

export default EditModal;
