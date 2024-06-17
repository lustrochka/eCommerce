import Component from '../../components/component/component';
import { div, p, img, span } from '../../components/tags/tags';
import { locationResolver } from '../../components/event/locationResolver';
import { Product } from '../../types';
import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import AddingButton from '../basket/addingButton';
import { getCount } from '../../components/productItem/productItem';
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
            if (!(e.target instanceof HTMLButtonElement)) {
                localStorage.setItem('product', id);
                locationResolver('/product');
            }
        });
        const button = new AddingButton('add-to-basket-btn', {}, id);
        card.appendChildren(title, picture, description, actualPrice, button);
        this.appendChildren(card);
    }
}

export default Products;
