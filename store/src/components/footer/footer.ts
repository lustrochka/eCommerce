import Component from '../../components/component/component';
import { div, span } from '../../components/tags/tags';

class Footer extends Component {
    constructor() {
        super('footer', 'footer');
        this.appendChildren(
            div(
                'container',
                div(
                    'footer__author',
                    span('footer__author--copy', 'WebPunk © 2024 All rights reserved'),
                    span('footer__author--name', 'Development: WebPunk team')
                )
            )
        );
    }
}

export default Footer;
