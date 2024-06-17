import Component from '../../components/component/component';
import { div, span, img, a } from '../../components/tags/tags';
import Button from '../../components/button/button';
import { getCarts, removeItem } from '../../services/api/api';
import { Cart } from '@commercetools/platform-sdk';
import BasketItem from './basket-item';
import './style.css';

class Basket extends Component {
    #message;

    constructor() {
        super('div', 'cart');
        this.#message = div('cart__msg', span('', 'Your basket is empty'), a('cart__link', '/catalog', 'Go shopping'));
        getCarts().then(({ body }) => this.showData(body.results));
    }

    showData(data: Cart[]) {
        if (data[0]) {
            data[0].lineItems.forEach((item) => {
                this.appendChildren(new BasketItem(item));
            });
            this.appendChildren(new Button('clear-button', 'Clear', {}, () => this.clearBasket()));
        } else {
            this.appendChildren(this.#message);
        }
    }

    clearBasket() {
        const ids = Array.from(this.getNode().children)
            .filter((x) => x.className === 'cart__item')
            .map((x) => x.id);
        removeItem(ids).then(({ body }) => {
            localStorage.setItem('cartVersion', body.version.toString());
            this.clear();
            this.appendChildren(this.#message);
        });
    }
}

export default Basket;
