import Component from '../../components/component/component';
import { div, span, img, a } from '../../components/tags/tags';
import Button from '../../components/button/button';
import { getCarts } from '../../services/api/api';
import { Cart } from '@commercetools/platform-sdk';
import BasketItem from './basket-item';
import './style.css';

class Basket extends Component {
    constructor() {
        super('div', 'cart');
        getCarts().then(({ body }) => this.showData(body.results));
    }

    showData(data: Cart[]) {
        if (data[0]) {
            data[0].lineItems.forEach((item) => {
                this.appendChildren(new BasketItem(item));
            });
        } else {
            this.appendChildren(
                div('cart__msg', span('', 'Your basket is empty'), a('cart__link', '/catalog', 'Go shopping'))
            );
        }
    }
}

export default Basket;
