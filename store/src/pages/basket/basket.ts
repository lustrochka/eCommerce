import Component from '../../components/component/component';
import { div } from '../../components/tags/tags';
// import Button from '../../components/button/button';

class Basket extends Component {
    constructor() {
        super('div', 'basket');
        const title = div('basket__title');
        title.changeText('Basket Page');
        this.appendChildren(title);
    }
}

export default Basket;
