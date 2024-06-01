import Component from '../../components/component/component';
import Button from '../../components/button/button';
import { div, span, p, img } from '../../components/tags/tags';
import { getProduct } from '../../services/api/productApi';
import { Product } from '../../types';
import './detailedProduct.css';

const description = { name: 'xiaomi super', size: 'XXL', color: 'red', weight: '300gr' };

export class DetailedProduct extends Component {
    constructor() {
        super('div', 'product');
        this.init();
    }

    init() {
        const productId = String(localStorage.getItem('product'));
        getProduct(productId)
            .then(({ body }) => {
                const numDiscount = body.masterData.current.masterVariant.prices?.[0].discounted?.value;
                const numPrice = body.masterData.current.masterVariant.prices?.[0].value;
                const product = {
                    title: body.masterData.current.name['en-US'] ? body.masterData.current.name['en-US'] : '',
                    picture: body.masterData.current.masterVariant.images?.[0].url
                        ? body.masterData.current.masterVariant.images?.[0].url
                        : '',
                    description: body.masterData.current.description?.['en-US']
                        ? body.masterData.current.description?.['en-US']
                        : '',
                    price: numPrice?.centAmount ? String(numPrice?.centAmount / 100) : '',
                    discount: numDiscount?.centAmount ? String(numDiscount?.centAmount / 100) : '',
                };
                console.log(product);
                this.getPage(product);
            })
            .catch((e) => console.log(e.message));
    }
    getPage(product: Product) {
        const title = div('product__title');
        title.changeText(product.title);
        this.appendChildren(
            div(
                'container',
                div(
                    'product__presentation',
                    div(
                        'slider',
                        div(
                            'swiper swiper--main',
                            div('swiper-wrapper', ...generateSwiperHTML(imageUrls)),
                            div('swiper-pagination')
                        ),
                        new Component(
                            'div',
                            'swiper swiper--thumbs',
                            div(
                                'swiper-wrapper',
                                div('swiper-button-prev'),
                                ...generateSwiperHTML(imageUrls),
                                div('swiper-button-next')
                            )
                        )
                    ),
                    div(
                        '',
                        title,
                        div(
                            'product__block',
                            div('product__price-block', getPrice(product.price, product.discount)),
                            new Button('product__button button', 'add to Cart', { type: 'button' })
                        ),
                        div(
                            'product__block',
                            div(
                                'product__block-half',
                                span('product__block-title product__block-title--delivery', 'Delivery'),
                                span(
                                    'product__block-text',
                                    'We will deliver within 2 hours and for free. Please check with the manager for the cost of delivery to other cities.'
                                )
                            ),
                            div(
                                'product__block-half',
                                span('product__block-title product__block-title--payment', 'Payment'),
                                span(
                                    'product__block-text',
                                    'We accept both cash and non-cash payments. Payment by electronic wallets and in installments is possible.'
                                )
                            )
                        )
                    )
                ),
                p('product__description-title', `Description: ${product.title}`),
                p('product__description-text', product.description),
                p('product__description-title', `Characteristics: ${product.title}`),
                div('product__description', generateCode(description))
            )
        );
        initSwiper();
    }
}
function getPrice(price: string, discount: string): Component<HTMLElement> {
    let result;
    if (discount === '') {
        result = new Component('div', 'product__price-block', span('product__price-new', `${price}€`));
    } else {
        result = new Component(
            'div',
            'product__price-block',
            span('product__price-old', `${price}€`),
            span('product__price-new', `${discount}€`)
        );
    }
    return result;
}

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
Swiper.use([Navigation, Pagination]);

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initSwiper() {
    // export function initSwiper(productItem: object) {
    // console.log(productItem);
    const thumbsSwiper = new Swiper('.swiper--thumbs', {
        spaceBetween: 0,
        slidesPerView: 3,
        // slidesPerView: productItem?.masterVariant?.images?.length || 1,
        // slidesPerView: productPromise .masterData.current.masterVariant.images.length,
        watchSlidesProgress: true,
    });

    const swiper = new Swiper('.swiper--main', {
        loop: true,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        scrollbar: {
            el: '.swiper-scrollbar',
        },

        thumbs: {
            swiper: thumbsSwiper,
        },
    });
}

function generateCode(description: { [key: string]: string }) {
    const children = [];

    for (const key in description) {
        children.push(
            div(
                'product__description-item',
                span('product__description-name', `${key}:`),
                span('product__description-value', `${description[key]}`)
            )
        );
    }

    return div('product__description-list', ...children);
}

function generateSwiperHTML(imageUrls: string[]): Component<HTMLElement>[] {
    const swiperSlides: Component<HTMLElement>[] = [];
    imageUrls.forEach((url) => {
        swiperSlides.push(div(`swiper-slide`, img('product__image', url, '')));
    });
    return swiperSlides;
}

const imageUrls: string[] = [
    'https://storage.googleapis.com/merchant-center-europe/sample-data/goodstore/Evergreen_Candle-1.1.jpeg',
    'https://storage.googleapis.com/merchant-center-europe/sample-data/goodstore/Evergreen_Candle-1.2.jpeg',
    'https://storage.googleapis.com/merchant-center-europe/sample-data/goodstore/Evergreen_Candle-1.3.jpeg',
];
