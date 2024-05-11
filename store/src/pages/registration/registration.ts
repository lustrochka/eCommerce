import Component from '../../components/component/component';
import Input from '../../components/input/input';
import Label from '../../components/label/label';
import { div } from '../../components/tags/tags';
import Address from './adress';
import Button from '../../components/button/button';
import './style.css';

class Registration extends Component {
    constructor() {
        super('form', 'registration');
        const title = div('registration__title');
        title.changeText('Registration');
        this.appendChildren(
            title,
            new Label('registration__label', 'Email', { for: 'Email' }),
            new Input('registration__input', { id: 'Email', placeholder: 'example@email.com' }),
            new Label('registration__label', 'Password', { for: 'password' }),
            new Input('registration__input', { id: 'password', placeholder: '1aZ*2bA+', type: 'password' }),
            new Label('registration__label', 'First name', { for: 'first-name' }),
            new Input('registration__input', { id: 'first-name', placeholder: 'Alex' }),
            new Label('registration__label', 'Last name', { for: 'last-name' }),
            new Input('registration__input', { id: 'last-name', placeholder: 'Adamovich' }),
            new Label('registration__label', 'Date of birth', { for: 'birth' }),
            new Input('registration__input', { id: 'birth', type: 'Date' }),
            div('registration__addresses', new Address('Shipping'), new Address('Billing')),
            new Button('registration__button button', 'Register', { type: 'button' })
        );
    }
}

export default Registration;
