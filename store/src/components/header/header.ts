import Component from '../../components/component/component';
import { div } from '../../components/tags/tags';
import Button from '../../components/button/button';
import { goPage } from '../../components/event/goPage';
import { locationResolver } from '../../components/event/locationResolver';

class Header extends Component {
    constructor() {
        super('header', 'header');
        const title = new Button('header__logo button', 'Logo', { type: 'button' }, () => locationResolver('#/main/'));
        title.changeText('Webpunk Store');
        this.appendChildren(
            div(
                'header__top-bar',
                div(
                    'container',
                    title,
                    new Button('header__button--cart', 'Cart', { type: 'button' }, () => locationResolver('#/cart/')),
                    new Button('header__button button', 'Login', { type: 'button' }, () =>
                        locationResolver('#/login/')
                    ),
                    new Button('header__button button', 'Registration', { type: 'button' }, () =>
                        locationResolver('#/registration/')
                    ),
                    new Button('header__button button', 'Profile', { type: 'button' }, () =>
                        locationResolver('#/profile/')
                    )
                )
            ),
            div(
                'header__nav-bar',
                div(
                    'container',
                    new Button('nav__button button', 'Main page', { type: 'button' }, () =>
                        locationResolver('#/main/')
                    ),
                    new Button('nav__button button', 'Catalog Product', { type: 'button' }, () =>
                        locationResolver('#/catalog/')
                    ),
                    new Button('nav__button button', 'About Us', { type: 'button' }, () => locationResolver('#/about/'))
                )
            )
            // new Button('nav__button button', 'Catalog Product', { type: 'button' }, goCatalog),
            // new Button('nav__button button', 'About Us', { type: 'button' }, goAboutUs)
        );
        // );
    }
}

export default Header;

// В разработке!
// import Login from '../../pages/login/login';
import Registration from '../../pages/registration/registration';
import Basket from '../../pages/basket/basket';
import UserProfile from '../../pages/userProfile/userProfile';
import AboutUs from '../../pages/aboutUs/aboutUs';
import CatalogProduct from '../../pages/catalogProduct/catalogProduct';
import Main from '../../pages/main/main';

function goLogin() {
    // В разработке!
    // goPage(Login);
}

// function goRegistration() {
//     goPage(Registration);
// }

// function goBasket() {
//     goPage(Basket);
// }

// function goProfile() {
//     goPage(UserProfile);
// }

// function goAboutUs() {
//     goPage(AboutUs);
// }

// function goCatalog() {
//     goPage(CatalogProduct);
// }

// function goMain() {
//     goPage(Main, 'body');
// }
