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
        this.appendChildren(
            new Header(),
            main(
                'main',
                div(
                    'container',
                    new Button('main__button button', 'Product', { type: 'button' }, () =>
                        locationResolver('/product')
                    ),
                    new Button('main__button button', 'Catalog', { type: 'button' }, () =>
                        locationResolver('/catalog')
                    ),
                    new Button('main__button button', 'Cart', { type: 'button' }, () => locationResolver('/cart')),
                    new Button('main__button button', 'About', { type: 'button' }, () => locationResolver('/about')),
                    new Button('main__button button', 'Registration', { type: 'button' }, () =>
                        locationResolver('/registration')
                    ),
                    new Button('main__button button', 'Login', { type: 'button' }, () => locationResolver('/login'))
                )
            ),
            new Footer()
        );
    }
}

export default Main;
