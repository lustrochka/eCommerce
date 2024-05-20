import Component from '../../components/component/component';
import { div } from '../../components/tags/tags';
import Button from '../../components/button/button';
import Modal from '../../components/modal/modal';
import { locationResolver } from '../../components/event/locationResolver';

class Header extends Component {
    constructor() {
        super('header', 'header');
        const title = new Button('header__logo button', 'Logo', { type: 'button' }, () => locationResolver('/'));
        title.changeText('Webpunk Store');
        this.appendChildren(
            div(
                'header__top-bar',
                div(
                    'container',
                    title,
                    new Button('header__button--cart', 'Cart', { type: 'button' }, () => locationResolver('/cart')),
                    new Button(
                        'header__button button',
                        'Registration',
                        { type: 'button', id: 'button-registration' },
                        () => locationResolver('/registration')
                    ),
                    new Button('header__button button', 'Login', { type: 'button', id: 'button-login' }, () =>
                        locationResolver('/login')
                    ),
                    new Button('header__button button', 'Logout', { type: 'button', id: 'button-logout' }, openModal),
                    new Button('header__button button', 'Profile', { type: 'button', id: 'button-profile' }, () =>
                        locationResolver('/profile')
                    )
                )
            ),
            div(
                'header__nav-bar',
                div(
                    'container',
                    new Button('nav__button button', 'Main page', { type: 'button' }, () => locationResolver('/')),
                    new Button('nav__button button', 'Catalog Product', { type: 'button' }, () =>
                        locationResolver('/catalog')
                    ),
                    new Button('nav__button button', 'About Us', { type: 'button' }, () => locationResolver('/about'))
                )
            )
        );
    }
}

export default Header;

function openModal() {
    const modal = new Modal();
    modal.open();
}
