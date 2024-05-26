import Component from '../../components/component/component';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import Form from '../../components/form/form';
import { div, span } from '../../components/tags/tags';
import Button from '../../components/button/button';
import INPUTS from '../registration/inputs';
import { updatePassword } from '../../services/api/api';
import Client from '../../services/api/client';

class PassModal extends Component {
    #form;

    #statusMessage;

    constructor() {
        super('div', 'pass-modal');
        this.#form = new Form('user-form');
        this.appendChildren(this.#form);

        const title = div('edit-modal__title');
        title.changeText('Edit password');

        this.#statusMessage = div('status-message');

        const submitBtn = new Button(
            'edit-modal__button button',
            'Save',
            {
                type: 'button',
                disabled: 'true',
            },
            () => this.sendData()
        );

        this.#form.appendChildren(
            title,
            this.#statusMessage,
            div(
                'pass-modal__block',
                new Label('edit-modal__label', 'Current password', { for: INPUTS[1].attributes.id }),
                new Input('edit-modal__input', INPUTS[1].attributes, true),
                span('edit-modal__error-msg', INPUTS[1].msg),
                new Button('show-button', '', { type: 'button' }, (e) => this.showPassword(e))
            ),
            div(
                'pass-modal__block',
                new Label('edit-modal__label', 'New password', { for: 'new-password' }),
                new Input('edit-modal__input', { ...INPUTS[1].attributes, id: 'new-password' }, true),
                span('edit-modal__error-msg', INPUTS[1].msg),
                new Button('show-button', '', { type: 'button' }, (e) => this.showPassword(e))
            ),
            submitBtn,
            new Button(
                'edit-modal__button button',
                'Cancel',
                {
                    type: 'button',
                },
                () => this.cancelInputs()
            ),
            new Button('close-button button', '✕', { type: 'button' }, () => this.destroy())
        );

        this.setListener('input', (event) => {
            if (event.target && event.target instanceof HTMLInputElement)
                this.#form.checkFormValidity(event.target, submitBtn.getNode());
            this.#statusMessage.changeText('');
        });
    }
    showPassword(e: Event | undefined) {
        if (e && e.target && e.target instanceof HTMLElement) {
            e.target.classList.toggle('active');
            const input = e.target.parentElement?.children[1];
            if (input instanceof HTMLInputElement) input.type = input.type === 'password' ? 'text' : 'password';
        }
    }
    cancelInputs() {
        this.#form.setElementValue(0, '');
        this.#form.setElementValue(2, '');
    }
    sendData() {
        const newPassword = this.#form.getElementValue(2);
        updatePassword(this.#form.getElementValue(0), newPassword)
            .then(({ body }) => {
                this.#statusMessage.changeText('Password changed');
                new Client().buildWithPasswordFlow(body.email, newPassword);
            })
            .catch((err) => this.#statusMessage.changeText(err.body.message));
    }
}

export default PassModal;
