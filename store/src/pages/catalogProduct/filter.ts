import Form from '../../components/form/form';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import { div, span } from '../../components/tags/tags';

const ATTRIBUTES: { [key: string]: string[] } = {
    brand: ['Acer', 'Apple', 'Dell', 'Honor', 'HP', 'Lenovo', 'Samsung', 'Xiaomi'],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    memory: ['4GB', '6GB', '8GB', '16GB', '32GB'],
};

class Filter extends Form {
    constructor(callback: () => void) {
        super('filter');
        Object.keys(ATTRIBUTES).forEach((key) => {
            const block = div('filter__block', span('filter__title', `${key}`));
            this.appendChildren(block);
            ATTRIBUTES[key].forEach((val) => {
                block.appendChildren(
                    div(
                        'filter__item',
                        new Input('filter__input', { type: 'radio', value: val, id: val, name: key }, false, callback),
                        new Label('filter__label', val, { for: val })
                    )
                );
            });
        });
    }

    getData() {
        return new FormData(this.getNode());
    }
}

export default Filter;
