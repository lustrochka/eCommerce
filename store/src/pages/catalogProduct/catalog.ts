import Component from '../../components/component/component';
import Products from './products';
import { sortingProducts } from '../../services/api/productApi';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Select from '../../components/select/select';
import { div } from '../../components/tags/tags';
import { QueryParam } from '@commercetools/platform-sdk';

const SORTING_VALUES = [
    ['Sort by name ASC', 'Sort by name DESC', 'Sort by price ASC', 'Sort by price DESC'],
    ['name.en-GB asc', 'name.en-GB desc', 'price asc', 'price desc'],
];

class Catalog extends Component {
    #sortValue;

    #filterValue;

    #searchValue;

    #productsContainer;

    constructor() {
        super('div', 'catalog');
        this.#productsContainer = div('catalog__container');
        this.#sortValue = '';
        this.#filterValue = '';
        this.#searchValue = '';

        const searchInput = new Input('catalog__search', { type: 'text' }, false);

        this.appendChildren(
            div(
                '',
                searchInput,
                new Button('catalog__search-button', 'Search', {}, () => {
                    this.#searchValue = searchInput.getValue();
                    this.makeRequest();
                })
            ),
            new Select('catalog__sort', 'sort', SORTING_VALUES, (e) => {
                this.#sortValue = (e.target as HTMLSelectElement).value;
                this.makeRequest();
            }),
            this.#productsContainer
        );
        this.makeRequest();
    }
    makeRequest() {
        const query: { [key: string]: QueryParam } = { sort: 'id asc', limit: 500 };
        if (this.#sortValue) query.sort = this.#sortValue;
        if (this.#searchValue) {
            query['text.en-GB'] = this.#searchValue;
            query.fuzzy = 'true';
        }

        sortingProducts(query).then(({ body }) => {
            this.#productsContainer.clear();
            this.#productsContainer.appendChildren(new Products(body.results));
        });
    }
}

export default Catalog;
