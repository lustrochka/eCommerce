import Component from '../component/component';
import { Items } from '../../types';

class Input extends Component<HTMLInputElement> {
    constructor(className: string, attributes: Items, required: boolean, onChange?: () => void) {
        super('input', className);
        this.addAttributes(attributes);
        if (required) this.getNode().required = true;
        if (onChange) this.setListener('input', onChange);
    }

    getValue() {
        return this.getNode().value;
    }
}

export default Input;
