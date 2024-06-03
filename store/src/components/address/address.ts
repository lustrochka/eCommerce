import Component from '../component/component';
import Label from '../../components/label/label';
import Input from '../../components/input/input';
import Select from '../../components/select/select';
import { span } from '../../components/tags/tags';
import { CodesType } from '../../types';
import { AddressDataType } from '../../types';

const COUNTRIES: CodesType = {
    Belarus: { pattern: '2[1-4][0-7]\\d{3}', placeholder: '220000' },
    Poland: { pattern: '\\d{2}-\\d{3}', placeholder: '00-000' },
};

class Address extends Component {
    _streetInput;

    _cityInput;

    _codeInput;

    _countryInput;

    static COUNTRY_CODES: { [key: string]: string } = { Belarus: 'BY', Poland: 'PL' };
    static CODES_BY_COUNTRIES: { [key: string]: string } = { BY: 'Belarus', PL: 'Poland' };

    constructor() {
        super('div', 'address');

        this._streetInput = new Input(
            'registration__input',
            { name: 'street', placeholder: 'Skaryny', pattern: '\\S+' },
            true
        );

        this._cityInput = new Input(
            'registration__input',
            { name: 'city', placeholder: 'Minsk', pattern: '[A-Za-z]+' },
            true
        );

        this._codeInput = new Input(
            'registration__input',
            { name: 'code', placeholder: COUNTRIES.Belarus.placeholder, pattern: COUNTRIES.Belarus.pattern },
            true
        );

        this._countryInput = new Select('registration__input', 'country', ['Belarus', 'Poland'], () =>
            this.changeCodePattern()
        );

        this.appendChildren(
            new Label('registration__label', 'Street', { for: 'street' }),
            this._streetInput,
            span('registration__error-msg', 'Street must contain at least one character'),
            new Label('registration__label', 'City', { for: 'city' }),
            this._cityInput,
            span(
                'registration__error-msg',
                'City must contain at least one character and no special characters or numbers'
            ),
            new Label('registration__label', 'Postal code', { for: 'code' }),
            this._codeInput,
            span('registration__error-msg', 'Postal code must follow the format for the country'),
            new Label('registration__label', 'Country', { for: 'country' }),
            this._countryInput
        );
    }

    changeCodePattern() {
        this._codeInput.addAttributes({
            pattern: COUNTRIES[this._countryInput.getValue()].pattern,
            placeholder: COUNTRIES[this._countryInput.getValue()].placeholder,
        });
    }

    getAddress() {
        return {
            streetName: this._streetInput.getValue(),
            city: this._cityInput.getValue(),
            postalCode: this._codeInput.getValue(),
            country: Address.COUNTRY_CODES[this._countryInput.getValue()],
        };
    }

    setCurrentValues(values: AddressDataType) {
        this._cityInput.getNode().value = values.data.city || '';
        this._codeInput.getNode().value = values.data.postalCode || '';
        this._countryInput.getNode().value = Address.CODES_BY_COUNTRIES[values.data.country] || '';
        this._streetInput.getNode().value = values.data.streetName || '';
    }
}

export default Address;
