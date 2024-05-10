import Component from '../../components/component/component';
import { div } from '../../components/tags/tags';
// import Button from '../../components/button/button';

class CatalogProduct extends Component {
    constructor() {
        super('div', 'catalog');
        const title = div('catalog__title');
        title.changeText('Catalog Product');
        this.appendChildren(title);
    }
}

export default CatalogProduct;
