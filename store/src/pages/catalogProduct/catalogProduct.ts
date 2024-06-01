import Component from '../../components/component/component';
import { div, p, img, span } from '../../components/tags/tags';
import { getProducts } from '../../services/api/productApi';
import { locationResolver } from '../../components/event/locationResolver';
import { Product } from '../../types';
import './style.css';

class CatalogProduct extends Component {
    constructor() {
        super('div', 'catalog');
        this.getFetch();
    }
    getFetch() {
        getProducts()
            .then(({ body }) => {
                body.results.forEach((el) => {
                    const numDiscount = el.masterData.current.masterVariant.prices?.[0].discounted?.value;
                    const numPrice = el.masterData.current.masterVariant.prices?.[0].value;
                    const product = {
                        title: el.masterData.current.name['en-US'] ? el.masterData.current.name['en-US'] : '',
                        picture: el.masterData.current.masterVariant.images?.[0].url
                            ? el.masterData.current.masterVariant.images?.[0].url
                            : '',
                        description: el.masterData.current.description?.['en-US']
                            ? el.masterData.current.description?.['en-US']
                            : '',
                        price: numPrice?.centAmount ? String(numPrice?.centAmount / 100) : '',
                        discount: numDiscount?.centAmount ? String(numDiscount?.centAmount / 100) : '',
                    };
                    const id = el.id;
                    this.getCard(product, id);
                });
            })
            .catch((e) => console.log(e.message));
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
        card.setListener('click', () => {
            localStorage.setItem('product', id);
            locationResolver('/product');
        });
        card.appendChildren(title, picture, description, actualPrice);
        this.appendChildren(card);
    }
}

export default CatalogProduct;
