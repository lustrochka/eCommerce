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
    #streetInput;

    #cityInput;

    #codeInput;

    #countryInput;

    #inputs: { [key: string]: Input | Select };

    #isDefaultSet;

    constructor(type: string) {
        super('div', 'address');
        this.addAttributes({ id: `${type.toLowerCase()}-address` });
        const title = div('logo');
        title.changeText(`${type}-address`);

        this.#streetInput = new Input(
            'registration__input',
            { name: 'street', placeholder: 'Skaryny', pattern: '\\S+' },
            true
        );

        this.#cityInput = new Input(
            'registration__input',
            { name: 'city', placeholder: 'Minsk', pattern: '[A-Za-z]+' },
            true
        );

        this.#codeInput = new Input(
            'registration__input',
            { name: 'code', placeholder: COUNTRIES.Belarus.placeholder, pattern: COUNTRIES.Belarus.pattern },
            true
        );

        this.#countryInput = new Select('registration__input', 'country', ['Belarus', 'Poland'], () =>
            this.changeCodePattern()
        );

        this.#inputs = {
            street: this.#streetInput,
            city: this.#cityInput,
            code: this.#codeInput,
            country: this.#countryInput,
        };

        this.#isDefaultSet = false;

        const defaultCheckbox: Input = new Input(
            'registration__checkbox',
            { id: `${type}-default`, type: 'checkbox' },
            false,
            () => (this.#isDefaultSet = defaultCheckbox.getNode().checked)
        );

        this.appendChildren(
            title,
            new Label('registration__label', 'Street', { for: 'street' }),
            this.#streetInput,
            span('registration__error-msg', 'Street must contain at least one character'),
            new Label('registration__label', 'City', { for: 'city' }),
            this.#cityInput,
            span(
                'registration__error-msg',
                'City must contain at least one character and no special characters or numbers'
            ),
            new Label('registration__label', 'Postal code', { for: 'code' }),
            this.#codeInput,
            span('registration__error-msg', 'Postal code must follow the format for the country'),
            new Label('registration__label', 'Country', { for: 'country' }),
            this.#countryInput,
            div(
                '',
                defaultCheckbox,
                new Label('registration__label-checkbox', 'Set as default', { for: `${type}-default` })
            )
        );
        if (type === 'Shipping')
            this.appendChildren(
                new Input('registration__checkbox', { id: 'common', type: 'checkbox' }, false),
                new Label('registration__label-checkbox', 'Set as billing', { for: 'common' })
            );
    }

    changeCodePattern() {
        this.#codeInput.addAttributes({
            pattern: COUNTRIES[this.#countryInput.getValue()].pattern,
            placeholder: COUNTRIES[this.#countryInput.getValue()].placeholder,
        });
    }

    setValues(values: string[]) {
        Object.values(this.#inputs).forEach((input, index) => {
            input.getNode().value = values[index];
            input instanceof Input ? input.setReadonly() : input.setImmutable();
        });
        this.changeCodePattern();
    }

    setInputsWritable() {
        Object.values(this.#inputs).forEach((input) => {
            input instanceof Input ? input.deleteReadonly() : input.setMutable();
        });
    }

    setValue(name: string, value: string) {
        if (this.#inputs[name]) this.#inputs[name].getNode().value = value;
        this.changeCodePattern();
    }

    getValues() {
        return Object.values(this.#inputs).map((input) => input.getValue());
    }

    getAddress() {
        const COUNTRY_CODES: { [key: string]: string } = { Belarus: 'BY', Poland: 'PL' };
        return {
            streetName: this.#streetInput.getValue(),
            city: this.#cityInput.getValue(),
            postalCode: this.#codeInput.getValue(),
            country: COUNTRY_CODES[this.#countryInput.getValue()],
        };
    }

    getIsDefaultSet() {
        return this.#isDefaultSet;
    }
}

export default Address;
