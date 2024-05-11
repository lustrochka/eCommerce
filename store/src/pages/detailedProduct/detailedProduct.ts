import Component from '../../components/component/component';
import { div } from '../../components/tags/tags';
// import Button from '../../components/button/button';

class DetailedProduct extends Component {
    constructor() {
        super('div', 'product');
        const title = div('product__title');
        title.changeText('Detailed Product');
        this.appendChildren(title);
    }
}

export default DetailedProduct;
