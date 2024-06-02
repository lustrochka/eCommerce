import Component from '../../components/component/component';
import { div } from '../../components/tags/tags';
import { getUserData } from '../../services/api/api';
import { Customer } from '@commercetools/platform-sdk';
import AddressBlock from './addressBlock';
import EditModal from './editModal';
import Button from '../../components/button/button';
import PassModal from './passModal';
import { AddressDataType } from '../../types';
import ModalAddress from './modalAddress';
import './style.css';

class UserProfile extends Component {
    constructor() {
        super('div', 'profile');
        getUserData().then((res) => this.showData(res.body));
    }

    showData(data: Customer) {
        localStorage.setItem('version', `${data.version}`);
        localStorage.setItem('id', `${data.id}`);
        const name = div('profile__name');
        name.changeText(`${data.firstName} ${data.lastName}`);
        const birthDate = div('profile__birth');
        birthDate.changeText(`${data.dateOfBirth?.split('-').reverse().join('.')}`);
        this.appendChildren(
            name,
            birthDate,
            new Button('edit-icon', '', {}, () =>
                document.body.appendChild(
                    new EditModal({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        dateOfBirth: data.dateOfBirth,
                        email: data.email,
                    }).getNode()
                )
            )
        );

        const addresses = div('profile__addresses');
        this.appendChildren(
            new Button('pass-button button', 'Change password', { type: 'button' }, () =>
                document.body.appendChild(new PassModal().getNode())
            ),
            addresses
        );

        data.addresses.forEach((address) => {
            const addressData: AddressDataType = { data: address };
            if (address.id) {
                addressData.id = address.id;
                if (data.billingAddressIds) addressData.billing = data.billingAddressIds.includes(address.id);
                if (data.shippingAddressIds) addressData.shipping = data.shippingAddressIds.includes(address.id);
                if (data.defaultBillingAddressId)
                    addressData.defaultBilling = data.defaultBillingAddressId === address.id;
                if (data.defaultShippingAddressId)
                    addressData.defaultShipping = data.defaultShippingAddressId === address.id;
            }
            addresses.appendChildren(new AddressBlock(addressData));
        });

        addresses.appendChildren(
            new Button('new-address-button button', '+', { type: 'button' }, () =>
                document.body.appendChild(new ModalAddress().getNode())
            )
        );
    }
}

export default UserProfile;
