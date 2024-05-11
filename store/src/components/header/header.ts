import Component from '../../components/component/component';
import { div } from '../../components/tags/tags';
import Button from '../../components/button/button';
import { goPage } from '../../components/event/goPage';

class Header extends Component {
    constructor() {
        super('header', 'header');
        const title = new Button('header__logo button', 'Logo', { type: 'button' }, goMain);
        title.changeText('Webpunk Store');
        this.appendChildren(
            div(
                'header__top-bar',
                div(
                    'container',
                    title,
                    new Button('header__button--cart', 'Cart', { type: 'button' }, goBasket),
                    new Button('header__button button', 'Login', { type: 'button' }, goLogin),
                    new Button('header__button button', 'Registration', { type: 'button' }, goRegistration),
                    new Button('header__button button', 'Profile', { type: 'button' }, goProfile)
                )
            ),
            div(
                'header__nav-bar',
                div(
                    'container',
                    new Button('nav__button button', 'Main page', { type: 'button' }, goMain),
                    new Button('nav__button button', 'Catalog Product', { type: 'button' }, goCatalog),
                    new Button('nav__button button', 'About Us', { type: 'button' }, goAboutUs)
                )
            )
        );
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

function goRegistration() {
    goPage(Registration);
}

function goBasket() {
    goPage(Basket);
}

function goProfile() {
    goPage(UserProfile);
}

function goAboutUs() {
    goPage(AboutUs);
}

function goCatalog() {
    goPage(CatalogProduct);
}

function goMain() {
    goPage(Main, 'body');
}
