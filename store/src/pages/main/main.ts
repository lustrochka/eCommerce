import Component from '../../components/component/component';
import { div, main, p } from '../../components/tags/tags';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { locationResolver } from '../../components/event/locationResolver';
import './main.css';

class Main extends Component {
    constructor() {
        super('div', 'page');
        const title = div('about-us__title');
        title.changeText('Welcome to SMART');
        this.appendChildren(
            new Header(),
            main(
                'main',
                div(
                    'container',
                    new Button('main__button button', 'Product', { type: 'button' }, () =>
                        locationResolver('/product')
                    ),
                    new Button('main__button button', 'Catalog', { type: 'button' }, () =>
                        locationResolver('/catalog')
                    ),
                    new Button('main__button button', 'Cart', { type: 'button' }, () => locationResolver('/cart')),
                    new Button('main__button button', 'About', { type: 'button' }, () => locationResolver('/about')),
                    new Button('main__button button', 'Registration', { type: 'button' }, () =>
                        locationResolver('/registration')
                    ),
                    new Button('main__button button', 'Login', { type: 'button' }, () => locationResolver('/login')),
                    title,
                    p(
                        'paragraph',
                        `Your world of technology starts here! We offer a wide range of smartphones, tablets and laptops from the world's leading manufacturers.`
                    ),
                    p(
                        'paragraph',
                        `Discover the latest smartphones with cutting-edge technology and innovative features. Whether you're looking for a smartphone for work, gaming or photography, we have something for everyone. Our range of tablets are ideal for work, study and entertainment on the go. From compact and lightweight models to powerful, large-screen devices, we have a tablet for everyone.`
                    ),
                    div(
                        'banner-container',
                        div('banner banner--1', p('banner-title', 'Discounts up to 30% on tablets and laptops.')),
                        div('banner banner--2', p('banner-title', 'Xiaomi Redmi tablets at a special price'))
                    ),
                    div(
                        'banner-container',
                        div('banner banner--3', p('banner-title', 'A week of great deals on the entire range.')),
                        div('banner banner--1', p('banner-title', 'Sale up to 50% off on all products.'))
                    ),
                    div(
                        'banner-container',
                        div('banner banner--2', p('banner-title', 'Your ideal choice in the world of technology!')),
                        div('banner banner--3', p('banner-title', 'Technologies for every day!'))
                    )
                )
            ),
            new Footer()
        );
        bannerEvent();
    }
}

export default Main;

function bannerEvent(): void {
    setTimeout(() => {
        document.querySelectorAll('.banner').forEach((element) => {
            element.addEventListener('click', () => {
                locationResolver('/catalog');
            });
        });
    }, 1000);
}
