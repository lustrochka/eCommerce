import Component from '../component/component';
import { option } from '../tags/tags';

class Select extends Component {
    constructor(className: string, name: string, options: string[]) {
        super('select', className);
        this.addAttributes({ name });
        options.forEach((el) => {
            this.appendChildren(option('', el));
        });
    }
}

export default Select;
