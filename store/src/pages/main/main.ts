import Component from '../../components/component/component';
import { div, main } from '../../components/tags/tags';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
// import { goPage } from '../../components/event/goPage';
import { locationResolver } from '../../components/event/locationResolver';

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
                    new Button('header__button button', 'Product', { type: 'button' }, () =>
                        locationResolver('/product')
                    )
                )
            ),
            new Footer()
        );
    }
}

export default Main;
