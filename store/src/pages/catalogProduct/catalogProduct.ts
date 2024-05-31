import Component from '../../components/component/component';
import { div, p, img, span } from '../../components/tags/tags';
import { getProducts } from '../../services/api/productApi';
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
                    const title = el.masterData.current.name['en-US'];
                    const picture = el.masterData.current.masterVariant.images?.[0].url;
                    const description = el.masterData.current.description?.['en-US'];
                    const discount = el.masterData.current.masterVariant.prices?.[0].discounted?.value;
                    const price = el.masterData.current.masterVariant.prices?.[0].value;
                    const strPrice = price?.centAmount ? String(price?.centAmount / 100) : '';
                    const strDiscount = discount?.centAmount ? String(discount?.centAmount / 100) : '';
                    this.getCard(title, picture, description, strPrice, strDiscount);
                });
            })
            .catch((e) => console.log(e.message));
    }
    getCard(name: string, image: string = '', text: string = '', strP: string, strD: string) {
        const card = div('card');
        const title = p('card__title', name);
        const picture = img('card__img', image, name);
        const description = p('card__description', text);
        const price = p('card__price', '');
        strD === ''
            ? price.appendChildren(span('card__actual-price', `${strP}€`))
            : price.appendChildren(span('card__old-price', `${strP}€`), span('card__actual-price', `${strD}€`));
        card.appendChildren(title, picture, description, price);
        this.appendChildren(card);
    }
}

export default CatalogProduct;
