import Component from '../../components/component/component';
import Label from '../../components/label/label';
import Input from '../../components/input/input';
import Select from '../../components/select/select';
import { div, span } from '../../components/tags/tags';
import { CodesType } from '../../types';

const COUNTRIES: CodesType = {
    Belarus: { pattern: '2[1-4][0-7]\\d{3}', placeholder: '220000' },
    Poland: { pattern: '\\d{2}-\\d{3}', placeholder: '00-000' },
};

class Address extends Component {
    constructor(type: string) {
        super('div', 'address');
        const title = div('logo');
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
            span('registration__error-msg', 'Street must contain at least one character'),
            new Label('registration__label', 'City', { for: `${type}-city` }),
            new Input('registration__input', { id: `${type}-city`, placeholder: 'Minsk', pattern: '[A-Za-z]+' }, true),
            span(
                'registration__error-msg',
                'City must contain at least one character and no special characters or numbers'
            ),
            new Label('registration__label', 'Postal code', { for: `${type}-code` }),
            codeInput,
            span('registration__error-msg', 'Postal code must follow the format for the country'),
            new Label('registration__label', 'Country', { for: `${type}-country` }),
            selectCountry
        );
    }
}

export default Address;
