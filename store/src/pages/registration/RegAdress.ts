import Address from '../../components/address/address';
import Input from '../../components/input/input';
import Select from '../../components/select/select';
import Label from '../../components/label/label';
import { div } from '../../components/tags/tags';

class RegAddress extends Address {
    #inputs: { [key: string]: Input | Select };

    #isDefaultSet;

    constructor(type: string) {
        super();
        this.addAttributes({ id: `${type.toLowerCase()}-address` });
        const title = div('logo');
        title.changeText(`${type}-address`);
        this.prepend(title);

        this.#inputs = {
            street: this._streetInput,
            city: this._cityInput,
            code: this._codeInput,
            country: this._countryInput,
        };

        this.#isDefaultSet = false;

        const defaultCheckbox: Input = new Input(
            'registration__checkbox',
            { id: `${type}-default`, type: 'checkbox' },
            false,
            () => (this.#isDefaultSet = defaultCheckbox.getNode().checked)
        );

        this.appendChildren(
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

    getIsDefaultSet() {
        return this.#isDefaultSet;
    }
}

export default RegAddress;
