import Component from '../../components/component/component';
import { div, span } from '../../components/tags/tags';
import Button from '../../components/button/button';

class Footer extends Component {
    constructor() {
        super('footer', 'footer');
        this.appendChildren(
            div(
                'container',
                div(
                    'footer__author',
                    span('footer__author--copy', 'WebPunk © 2024 Все права защищены'),
                    span('footer__author--name', 'Разработка: WebPunk team')
                )
            )
        );
    }
}

export default Footer;
