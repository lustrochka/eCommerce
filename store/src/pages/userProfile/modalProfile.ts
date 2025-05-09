import Component from '../../components/component/component';
import Form from '../../components/form/form';
import { div } from '../../components/tags/tags';
import Button from '../../components/button/button';

class ModalProfile extends Component {
    _form;

    constructor(titleText: string) {
        super('div', 'edit-modal');
        this._form = new Form('user-form');
        this.appendChildren(this._form);

        const title = div('edit-modal__title');
        title.changeText(titleText);

        this.appendChildren(div('modal-container', title, this._form));

        this._form.appendChildren(new Button('close-button button', '✕', { type: 'button' }, () => this.destroy()));
    }
}

export default ModalProfile;
