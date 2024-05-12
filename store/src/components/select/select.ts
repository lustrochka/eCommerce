import Component from '../component/component';
import { option } from '../tags/tags';

class Select extends Component<HTMLSelectElement> {
    constructor(className: string, name: string, options: string[], onChange: () => void) {
        super('select', className);
        this.addAttributes({ name });
        options.forEach((el) => {
            this.appendChildren(option('', el));
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
