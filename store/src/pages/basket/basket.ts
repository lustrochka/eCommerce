import Component from '../../components/component/component';
import { div, span, img } from '../../components/tags/tags';
import Button from '../../components/button/button';
import { getCarts } from '../../services/api/api';
import { Cart } from '@commercetools/platform-sdk';
import './style.css';

class Basket extends Component {
    constructor() {
        super('div', 'cart');
        getCarts().then(({ body }) => this.showData(body.results));
    }

    showData(data: Cart[]) {
        if (data[0]) {
            data[0].lineItems.forEach((item) => {
                const src = item.variant.images ? item.variant.images[0].url : '';
                this.appendChildren(
                    div(
                        'cart__item',
                        img('cart__image', src, 'product photo'),
                        span('cart__name', item.name['en-GB']),
                        span('cart__price', `${item.totalPrice.centAmount / 100}€` || '')
                    )
                );
            });
        } else {
            this.appendChildren(span('basket__msg', 'There is nothing in your basket yet'));
        }
    }
}

export default Basket;
