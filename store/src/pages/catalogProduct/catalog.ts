import Component from '../../components/component/component';
import Products from './products';
import { sortingProducts } from '../../services/api/productApi';
import { getProducts } from '../../services/api/productApi';
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

        this.appendChildren(
            new Select('catalog__sort', 'sort', SORTING_VALUES, (e) => {
                this.#sortValue = (e.target as HTMLSelectElement).value;
                this.makeRequest();
            }),
            this.#productsContainer
        );
        this.makeRequest();
    }
    makeRequest() {
        const query = !this.#sortValue && !this.#filterValue && !this.#searchValue ? {} : this.makeQuery();

        sortingProducts(query).then(({ body }) => {
            this.#productsContainer.clear();
            this.#productsContainer.appendChildren(new Products(body.results));
        });
    }

    makeQuery() {
        const query: { [key: string]: QueryParam } = {};
        if (this.#sortValue) query.sort = this.#sortValue;
        return query;
    }
}

export default Catalog;
