import Component from '../../components/component/component';
import Label from '../../components/label/label';
import Input from '../../components/input/input';
import Select from '../../components/select/select';
import { div } from '../../components/tags/tags';
import { CodesType } from '../../types';

const COUNTRIES: CodesType = {
    Belarus: { pattern: '2[1-4][0-7]\\d{3}', placeholder: '220000' },
    Poland: { pattern: '\\d{2}-\\d{3}', placeholder: '00-000' },
};

class Address extends Component {
    constructor(type: string) {
        super('div', 'address');
        const title = div('address-title');
        title.changeText(`${type}-address`);
        const codeInput = new Input(
            'registration__input',
            { id: `${type}-code`, placeholder: COUNTRIES.Belarus.placeholder, pattern: COUNTRIES.Belarus.pattern },
            true
        );
        const selectCountry = new Select('registration__input', `${type}-country`, ['Belarus', 'Poland'], () => {
            codeInput.addAttributes({
                pattern: COUNTRIES[selectCountry.getValue()].pattern,
                placeholder: COUNTRIES[selectCountry.getValue()].placeholder,
            });
        });
        this.appendChildren(
            title,
            new Label('registration__label', 'Street', { for: `${type}-street` }),
            new Input('registration__input', { id: `${type}-street`, placeholder: 'Skaryny', pattern: '\\S+' }, true),
            new Label('registration__label', 'City', { for: `${type}-city` }),
            new Input('registration__input', { id: `${type}-city`, placeholder: 'Minsk', pattern: '[A-Za-z]+' }, true),
            new Label('registration__label', 'Postal code', { for: `${type}-code` }),
            codeInput,
            new Label('registration__label', 'Country', { for: `${type}-country` }),
            selectCountry
        );
    }
}

export default Address;
