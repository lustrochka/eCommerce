import Component from '../../components/component/component';
import { div, span, img, a } from '../../components/tags/tags';
import Button from '../../components/button/button';
import { LineItem } from '@commercetools/platform-sdk';
import { changeItemQuantity, removeItem } from '../../services/api/api';

class BasketItem extends Component {
    #quantityIndicator;

    #price;

    #priceIndicator;

    constructor(data: LineItem) {
        super('div', 'cart__item');
        const src = data.variant.images ? data.variant.images[0].url : '';
        let quantity = data.quantity;
        this.#quantityIndicator = span('', data.quantity.toString());
        this.#price = data.totalPrice.centAmount / 100;
        this.#priceIndicator = span('cart__price', `${data.totalPrice.centAmount / 100}€` || '');
        this.getNode().id = data.id;

        this.appendChildren(
            img('cart__image', src, 'product photo'),
            span('cart__name', data.name['en-GB']),
            div(
                'item-quantity',
                new Button('', '-', {}, () => this.changeQuantity(--quantity)),
                this.#quantityIndicator,
                new Button('', '+', {}, () => this.changeQuantity(++quantity))
            ),
            this.#priceIndicator,
            new Button('delete-button', 'Remove', {}, () =>
                removeItem([this.getNode().id]).then(({ body }) => {
                    localStorage.setItem('cartVersion', body.version.toString());
                    this.destroy();
                })
            )
        );
    }

    changeQuantity(quantity: number) {
        changeItemQuantity(this.getNode().id, quantity).then(({ body }) => {
            localStorage.setItem('cartVersion', body.version.toString());
            if (quantity === 0) this.destroy();
            else {
                this.#quantityIndicator.changeText(quantity.toString());
                this.#priceIndicator.changeText(`${quantity * this.#price}€`);
            }
        });
    }
}

export default BasketItem;
