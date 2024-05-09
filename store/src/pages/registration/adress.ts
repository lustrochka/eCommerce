import Component from '../../components/component/component';
import Label from '../../components/label/label';
import Input from '../../components/input/input';
import Select from '../../components/select/select';
import { div } from '../../components/tags/tags';

class Address extends Component {
    constructor(type: string) {
        super('div', 'address');
        const title = div('address-title');
        title.changeText(`${type}-address`);
        this.appendChildren(
            title,
            new Label('registration__label', 'Street', { for: 'street' }),
            new Input('registration__input', { name: 'street', placeholder: 'Skaryny' }),
            new Label('registration__label', 'City', { for: 'city' }),
            new Input('registration__input', { name: 'city', placeholder: 'Minsk' }),
            new Label('registration__label', 'Postal code', { for: 'code' }),
            new Input('registration__input', { name: 'code', placeholder: '220000' }),
            new Label('registration__label', 'Country', { for: 'country' }),
            new Select('registration__input', 'country', ['Belarus', 'Poland'])
        );
    }
}

export default Address;
