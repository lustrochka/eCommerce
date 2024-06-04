import Component from '../component/component';
import { option } from '../tags/tags';

class Select extends Component<HTMLSelectElement> {
    constructor(className: string, name: string, options: string[][], onChange: (e: Event) => void) {
        super('select', className);
        this.addAttributes({ name });
        options[0].forEach((el, i) => {
            this.appendChildren(option('', el, options[1][i]));
        });
        this.setListener('change', onChange);
    }

    getValue() {
        return this.getNode().value;
    }

    setImmutable() {
        this.getNode().disabled = true;
    }

    setMutable() {
        this.getNode().disabled = false;
    }
}

export default Select;
