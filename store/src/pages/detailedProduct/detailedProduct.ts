import Component from '../../components/component/component';
import Button from '../../components/button/button';
import { div, span, p, img } from '../../components/tags/tags';
import { getProduct } from '../../services/api/productApi';
import './detailedProduct.css';

const description = { name: 'xiaomi super', size: 'XXL', color: 'red', weight: '300gr' };

export class DetailedProduct extends Component {
    constructor() {
        super('div', 'product');
        this.init();
    }

    async init() {
        const productPromise = getProduct('a2bb5a3d-4c9d-4aa1-b424-f575616570c1');
        let productItem;
        try {
            const product = await productPromise;
            console.log(product.body);
            productItem = product.body.masterData.current;
            console.log(productItem);
        } catch (error) {
            console.error('Error:', error);
        }

        const title = div('product__title');
        title.changeText(`${productItem?.name?.['en-US']}`);
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
                            new Component(
                                'div',
                                'product__price-block',
                                span('product__price-old', '1000 $'),
                                div(
                                    'product__discount',
                                    span('product__discount-percent', '10%'),
                                    span('product__discount-value', '- 100$')
                                ),
                                span('product__price-new', '900 $')
                            ),
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
                p('product__description-title', `Description: ${productItem?.name?.['en-US']}`),
                p('product__description-text', `${productItem?.description?.['en-US']}`),
                p('product__description-title', `Characteristics: ${productItem?.name?.['en-US']}`),
                div('product__description', generateCode(description))
            )
        );
        initSwiper();
    }
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
