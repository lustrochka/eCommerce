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

class Address extends Component<HTMLFormElement> {
    constructor(type: string) {
        super('form', 'address');
        this.addAttributes({ id: `${type.toLowerCase()}-address` });
        const title = div('logo');
        title.changeText(`${type}-address`);

        const codeInput = new Input(
            'registration__input',
            { name: 'code', placeholder: COUNTRIES.Belarus.placeholder, pattern: COUNTRIES.Belarus.pattern },
            true
        );

        const selectCountry = new Select('registration__input', 'country', ['Belarus', 'Poland'], () => {
            codeInput.addAttributes({
                pattern: COUNTRIES[selectCountry.getValue()].pattern,
                placeholder: COUNTRIES[selectCountry.getValue()].placeholder,
            });
        });

        this.appendChildren(
            title,
            new Label('registration__label', 'Street', { for: 'street' }),
            new Input('registration__input', { name: 'street', placeholder: 'Skaryny', pattern: '\\S+' }, true),
            span('registration__error-msg', 'Street must contain at least one character'),
            new Label('registration__label', 'City', { for: 'city' }),
            new Input('registration__input', { name: 'city', placeholder: 'Minsk', pattern: '[A-Za-z]+' }, true),
            span(
                'registration__error-msg',
                'City must contain at least one character and no special characters or numbers'
            ),
            new Label('registration__label', 'Postal code', { for: 'code' }),
            codeInput,
            span('registration__error-msg', 'Postal code must follow the format for the country'),
            new Label('registration__label', 'Country', { for: 'country' }),
            selectCountry,
            div(
                '',
                new Input('registration__checkbox', { id: `${type}-default`, type: 'checkbox' }, false),
                new Label('registration__label-checkbox', 'Set as default', { for: `${type}-default` })
            )
        );
        if (type === 'Shipping')
            this.appendChildren(
                new Input('registration__checkbox', { id: 'common', type: 'checkbox' }, false),
                new Label('registration__label-checkbox', 'Set as billing', { for: 'common' })
            );
    }

    getElementValue(index: number) {
        const element = this.getNode().elements[index];
        if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) return element.value;
        return '';
    }

    setElementValue(index: number, value: string) {
        const element = this.getNode().elements[index];
        if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) element.value = value;
    }
}

export default Address;
