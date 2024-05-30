import Component from '../../components/component/component';
import { div, p, img } from '../../components/tags/tags';
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
                    this.getCard(title, picture, description);
                });
            })
            .catch((e) => console.log(e.message));
    }
    getCard(one: string, two: string = '', three: string = '') {
        const card = div('card');
        const title = p('card__title', one);
        const picture = img('card__img', two, one);
        const description = p('card__description', three);
        card.appendChildren(title, picture, description);
        this.appendChildren(card);
    }
}

export default CatalogProduct;
