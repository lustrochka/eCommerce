import Component from '../../components/component/component';
import { div } from '../../components/tags/tags';
// import Button from '../../components/button/button';

class Basket extends Component {
    constructor() {
        super('div', 'cart');
        const title = div('cart__title');
        title.changeText('Cart Page');
        this.appendChildren(title);
    }
}

export default Basket;
