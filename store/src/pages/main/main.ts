import Component from '../../components/component/component';
// import Input from '../../components/input/input';
// import Label from '../../components/label/label';
import { div, main } from '../../components/tags/tags';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

class Main extends Component {
    constructor() {
        super('div', 'page');
        const title = div('main');
        title.changeText('Main Page');
        this.appendChildren(
            new Header(),
            main(
                'main',
                div(
                    'container',
                    title,
                    new Button('header__button button', 'Product', { type: 'button' }, goProduct),
                    new Button('header__button button', 'Not Found', { type: 'button' }, goNotFound)
                )
            ),
            new Footer()
        );
    }
}

export default Main;

import DetailedProduct from '../../pages/detailedProduct/detailedProduct';
function goProduct() {
    goPage(DetailedProduct);
}

import NotFound from '../../pages/notFound/notFound';

function goNotFound() {
    goPage(NotFound);
}

interface Page {
    getNode: () => HTMLElement;
}

function goPage(Page: new () => Page, selector = 'main') {
    const element = document.querySelector(selector);
    const container = element?.querySelector('.container');
    if (container) {
        container.innerHTML = '';
    }
    container?.appendChild(new Page().getNode());
}
// import Registration from '../../pages/registration/registration';
// function goRegistration() {
//     const main = document.querySelector('main');
//     main?.appendChild(new Registration().getNode());
//     // document.body.appendChild(new Registration().getNode());
// }

// // import Login from '../../pages/login/login';
// function goLogin() {
//     // document.body.appendChild(new Login().getNode());
// }

// function goBasket() {
//     //
// }

// function goProfile() {
//     //
// }

// function goAboutUs() {
//     //
// }
