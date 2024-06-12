import Component from '../../components/component/component';
import { div } from '../../components/tags/tags';
import Button from '../../components/button/button';
import { getCarts } from '../../services/api/api';
import { Cart } from '@commercetools/platform-sdk';

class Basket extends Component {
    constructor() {
        super('div', 'cart');
        getCarts().then(({ body }) => this.showData(body.results));
        const title = div('cart__title');
        title.changeText('Cart Page');
        this.appendChildren(title);
    }

    showData(data: Cart[]) {
        data.forEach((cart) => cart.lineItems);
    }
}

export default Basket;
