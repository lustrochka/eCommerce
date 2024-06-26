import Component from '../component/component';
import { Items } from '../../types';

class Button extends Component<HTMLButtonElement> {
    constructor(className: string, text: string, attributes: Items, onClick?: (x: Event | undefined) => void) {
        super('button', className);
        this.addAttributes(attributes);
        this.changeText(text);
        if (onClick) this.setListener('click', onClick);
    }
}

export default Button;
