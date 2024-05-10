import Component from '../component/component';
import { Items } from '../../types';

class Button extends Component {
    constructor(className: string, text: string, attributes: Items, onClick?: () => void) {
        super('button', className);
        this.addAttributes(attributes);
        this.changeText(text);
        if (onClick) this.setListener('click', onClick);
    }
}

export default Button;
