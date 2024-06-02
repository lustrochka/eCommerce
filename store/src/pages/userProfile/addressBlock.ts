import Component from '../../components/component/component';
import { div, span } from '../../components/tags/tags';
import { Items } from '../../types';
import { AddressDataType } from '../../types';
import Button from '../../components/button/button';
import { removeAddress } from '../../services/api/api';

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
            div(
                '',
                div('', span('profile__address__type', billingText), span('profile__address__type', shippingText)),
                country,
                postalCode,
                city,
                street,
                new Button('edit-icon', '', {})
            ),
            new Button('delete-button button', 'Delete', { type: 'button' }, () => this.deleteAddress(info.id))
        );

        if (info.id) this.addAttributes({ id: info.id });
    }

    deleteAddress(id?: string) {
        if (id) {
            removeAddress(id).then((res) => {
                localStorage.setItem('version', res.body.version.toString());
                this.destroy();
            });
        }
    }
}

export default AddressBlock;
