import Component from '../../components/component/component';
import { div, main } from '../../components/tags/tags';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { goPage } from '../../components/event/goPage';

class Main extends Component {
    constructor() {
        super('div', 'page');
        const title = div('main');
        title.changeText('Main Page (кнопки снизу для теста!)');
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
