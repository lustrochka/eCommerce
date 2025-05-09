import Component from '../component/component';
import { Items } from '../../types';

class Label extends Component {
    constructor(className: string, text: string, attributes: Items) {
        super('label', className);
        this.addAttributes(attributes);
        this.changeText(text);
    }
}

export default Label;
