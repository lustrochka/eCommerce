import Component from '../component/component';
import Button from '../button/button';
import { div, p } from '../tags/tags';
import './style.css';

class Modal extends Component {
    constructor(message: string) {
        super('div', 'error-modal');
        console.log('a');
        this.appendChildren(
            div(
                'error-message',
                p('error-message__text', `${message}`),
                p('error-message__text', 'Please try again'),
                new Button('modal__button', 'OK', { type: 'button' }, () => this.destroy())
            )
        );
    }
}

export default Modal;
