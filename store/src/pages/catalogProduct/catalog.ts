import Component from '../../components/component/component';
import Products from './products';
import { sortingProducts } from '../../services/api/productApi';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Select from '../../components/select/select';
import Filter from './filter';
import { div, span } from '../../components/tags/tags';
import { QueryParam } from '@commercetools/platform-sdk';

const SORTING_VALUES = [
    ['Sort by name ASC', 'Sort by name DESC', 'Sort by price ASC', 'Sort by price DESC'],
    ['name.en-GB asc', 'name.en-GB desc', 'price asc', 'price desc'],
];

class Catalog extends Component {
    #sortValue;

    #filterValue: FormData | null;

    #searchValue;

    #productsContainer;

    #filtersReset;

    constructor() {
        super('div', 'catalog');
        this.#productsContainer = div('products-container');
        this.#sortValue = '';
        this.#filterValue = null;
        this.#searchValue = '';

        const searchInput = new Input('catalog__search', { type: 'text' }, false);
        const filter: Filter = new Filter(() => {
            this.#filterValue = filter.getData();
            this.makeRequest();
            this.addFiltersReset();
        });
        this.#filtersReset = div('filters-reset');

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
            this.#filtersReset,
            div('filter__container', filter, this.#productsContainer)
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
        if (this.#filterValue) {
            const filter: string[] = [];
            for (const [name, value] of this.#filterValue.entries()) {
                filter.push(`variants.attributes.${name}:"${value}"`);
            }
            query.filter = filter;
        }

        sortingProducts(query).then(({ body }) => {
            this.#productsContainer.clear();
            this.#productsContainer.appendChildren(new Products(body.results));
        });
    }

    addFiltersReset() {
        this.#filtersReset.clear();
        for (const [name, value] of (this.#filterValue as FormData).entries()) {
            const reset = div('filters-reset__item');
            reset.changeText(`${name}: ${value}`);
            reset.appendChildren(
                new Button('close-filter', '✕', { type: 'button' }, () => {
                    reset.destroy();
                    (document.getElementById(`${value}`) as HTMLInputElement).checked = false;
                    this.#filterValue?.delete(name);
                    this.makeRequest();
                })
            );
            this.#filtersReset.appendChildren(reset);
        }
    }
}

export default Catalog;
