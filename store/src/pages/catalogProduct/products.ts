import Component from '../../components/component/component';
import { div, p, img, span } from '../../components/tags/tags';
import { locationResolver } from '../../components/event/locationResolver';
import Button from '../../components/button/button';
import { Product } from '../../types';
import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { createCart, addItem } from '../../services/api/api';
import { getCount, addButton } from '../../components/productItem/productItem';
import './style.css';

class Products extends Component {
    constructor(data: ProductProjectionPagedQueryResponse['results']) {
        super('div', 'products');
        data.forEach((el) => {
            const numDiscount = el.masterVariant.prices?.[0].discounted?.value;
            const numPrice = el.masterVariant.prices?.[0].value;
            const product = {
                title: el.name['en-GB'] ? el.name['en-GB'] : '',
                picture: el.masterVariant.images?.[0].url ? el.masterVariant.images?.[0].url : '',
                description: el.description?.['en-GB'] ? el.description?.['en-GB'] : '',
                price: numPrice?.centAmount ? String(numPrice?.centAmount / 100) : '',
                discount: numDiscount?.centAmount ? String(numDiscount?.centAmount / 100) : '',
            };
            const id = el.id;
            this.getCard(product, id);
        });
        getCount();
    }

    getCard(product: Product, id: string) {
        const card = div('card');
        const title = p('card__title', product.title);
        const picture = img('card__img', product.picture, product.title);
        const description = p('card__description', product.description);
        const actualPrice = p('card__price', '');
        product.discount === ''
            ? actualPrice.appendChildren(span('card__actual-price', `${product.price}€`))
            : actualPrice.appendChildren(
                  span('card__old-price', `${product.price}€`),
                  span('card__actual-price', `${product.discount}€`)
              );
        card.addId(id);
        card.setListener('click', (e) => {
            if (e.target instanceof HTMLButtonElement) {
                this.addItemToBasket(e.target, id);
                getCount();
            } else {
                localStorage.setItem('product', id);
                locationResolver('/product');
            }
        });
        const button = new Button('add-to-basket-btn', 'Add to basket', {});
        card.appendChildren(title, picture, description, actualPrice, button);
        this.appendChildren(card);
    }

    addItemToBasket(button: HTMLButtonElement, productId: string) {
        addButton(button);
        const id = localStorage.getItem('cartId') || localStorage.getItem('anonimCartId');
        if (id) {
            addItem(productId, id, Number(localStorage.getItem('cartVersion'))).then(({ body }) =>
                localStorage.setItem('cartVersion', body.version.toString())
            );
        } else {
            createCart().then(({ body }) => {
                addItem(productId, body.id, body.version).then(({ body }) =>
                    localStorage.setItem('cartVersion', body.version.toString())
                );
                localStorage.getItem('token')
                    ? localStorage.setItem('cartId', body.id)
                    : localStorage.setItem('anonimCartId', body.id);
                localStorage.setItem('cartVersion', body.version.toString());
            });
        }
    }
}

export default Products;
