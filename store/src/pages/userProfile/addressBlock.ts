import { BaseAddress } from '@commercetools/platform-sdk';
import Component from '../../components/component/component';
import { div, span } from '../../components/tags/tags';
import { Items } from '../../types';
import { AddressDataType } from '../../types';

const COUNTRY_CODES: Items = { BY: 'Belarus', PL: 'Poland' };

class AddressBlock extends Component {
    constructor(info: AddressDataType) {
        super('div', 'profile__address');

        const country = div(
            'profile__address__item',
            span('', 'Country: '),
            span('', `${COUNTRY_CODES[info.data.country]}`)
        );

        const postalCode = div(
            'profile__address__item',
            span('', 'Postal code: '),
            span('', `${info.data.postalCode}`)
        );
        const city = div('profile__address__item', span('', 'City: '), span('', `${info.data.city}`));
        const street = div('profile__address__item', span('', 'Street: '), span('', `${info.data.streetName}`));

        let billingText = '';
        let shippingText = '';
        if (info.defaultBilling) billingText += 'default ';
        if (info.defaultShipping) shippingText += 'default ';
        if (info.billing) billingText += 'billing';
        if (info.shipping) shippingText += 'shipping';
        this.appendChildren(
            div('', span('profile__address__type', billingText), span('profile__address__type', shippingText)),
            country,
            postalCode,
            city,
            street
        );
    }
}

export default AddressBlock;
