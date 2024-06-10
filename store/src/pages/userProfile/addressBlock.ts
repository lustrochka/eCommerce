import Component from '../../components/component/component';
import { div, span } from '../../components/tags/tags';
import ModalAddress from './modalAddress';
import { AddressDataType } from '../../types';
import Button from '../../components/button/button';
import { removeAddress } from '../../services/api/api';
import Address from '../../components/address/address';
import ModalDefault from './modalDefault';

class AddressBlock extends Component {
    constructor(info: AddressDataType) {
        super('div', 'profile__address');

        const country = div(
            'profile__address__item',
            span('', 'Country: '),
            span('', `${Address.CODES_BY_COUNTRIES[info.data.country]}`)
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

        const buttons = div(
            '',
            new Button('delete-button button', 'Delete', { type: 'button' }, () => this.deleteAddress(info.id))
        );
        if (!info.defaultBilling || !info.defaultShipping)
            buttons.appendChildren(
                new Button('default-button button', 'Default', { type: 'button' }, () =>
                    document.body.appendChild(
                        new ModalDefault(info.id, info.defaultBilling, info.defaultShipping).getNode()
                    )
                )
            );
        this.appendChildren(
            div(
                '',
                div('', span('profile__address__type', billingText), span('profile__address__type', shippingText)),
                country,
                postalCode,
                city,
                street,
                new Button('edit-icon', '', {}, () => document.body.appendChild(new ModalAddress(info).getNode()))
            ),
            buttons
        );
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
