import Component from '../../components/component/component';
import { div, span, img, a, p } from '../../components/tags/tags';
import Button from '../../components/button/button';
import { getCarts } from '../../services/api/api';
import { Cart } from '@commercetools/platform-sdk';
import BasketItem from './basket-item';
import './style.css';

let totalCount: number, totalPrice: number, totalDiscount: number | undefined;

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
            this.appendChildren(
                div(
                    'total__wrapper',
                    p('total__title', 'Total:'),
                    div(
                        'total__line',
                        p('total__description  total__description--count', `${0} items worth`),
                        p('total__value total__value--total-price', `items worth`)
                    ),
                    div(
                        'total__line',
                        p('total__description', 'The discount is'),
                        p('total__value total__value--discount', `${totalPrice} items worth`)
                    ),
                    div(
                        'total__line',
                        p('total__description', 'For payment'),
                        p('total__value total__value--price-with-discount', `${totalDiscount} items worth`)
                    ),
                    new Button('product__button total__button button', 'pay for the order', {
                        type: 'button',
                    })
                )
            );
        } else {
            this.appendChildren(
                div('cart__msg', span('', 'Your basket is empty'), a('cart__link', '/catalog', 'Go shopping'))
            );
        }
        this.getTotal();
    }
    getTotal() {
        getCarts().then(
            (response) => {
                totalPrice = response.body.results[0].totalPrice.centAmount;
                totalCount = response.body.results[0].lineItems.length;
                totalDiscount = response.body.results[0].discountOnTotalPrice?.discountedAmount.centAmount ?? 0;
                const tCount = document.querySelector('.total__description--count');
                const tPrice = document.querySelector('.total__value--total-price');
                const tDiscount = document.querySelector('.total__value--discount');
                const tResult = document.querySelector('.total__value--price-with-discount');
                if (tCount && tPrice && tDiscount && tResult && totalCount) {
                    tCount.innerHTML = `${totalCount} items worth`;
                    tPrice.innerHTML = `${totalPrice / 100} €`;
                    tDiscount.innerHTML = `${totalDiscount / 100} €`;
                    tResult.innerHTML = `${(totalPrice - totalDiscount) / 100} €`;
                }
            },
            (error) => {
                throw error;
            }
        );
    }
}

export default Basket;
