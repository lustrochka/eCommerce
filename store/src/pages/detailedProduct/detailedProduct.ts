import Component from '../../components/component/component';
import Button from '../../components/button/button';
import { div, span, p, img } from '../../components/tags/tags';
import { getProduct } from '../../services/api/productApi';
import { Product } from '../../types';
import './detailedProduct.css';

const description = { name: 'xiaomi super', size: 'XXL', color: 'red', weight: '300gr' };
let productImages: string[];

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
                productImages = [];
                body.masterData.current.masterVariant.images?.forEach((el: { url: string }) => {
                    imagesUrls(el.url);
                });
                this.getPage(product, productImages);
            })
            .catch((e) => console.log(e.message));
    }
    getPage(product: Product, productImages: string[]) {
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
                            div('swiper-wrapper', ...generateSwiperHTML(productImages)),
                            div('swiper-pagination')
                        ),
                        div('swiper-button-wrapper', div('swiper-button-prev'), div('swiper-button-next')),
                        new Component(
                            'div',
                            'swiper swiper--thumbs',
                            div('swiper-wrapper', ...generateSwiperHTML(productImages))
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
        initSwiper(productImages);
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

function initSwiper(imagesArr: string[]) {
    const thumbsSwiper = new Swiper('.swiper--thumbs', {
        spaceBetween: 0,
        slidesPerView: imagesArr.length,
        watchSlidesProgress: true,
    });

    const swiper = new Swiper('.swiper--main', {
        loop: true,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        scrollbar: { el: '.swiper-scrollbar' },

        thumbs: { swiper: thumbsSwiper },
    });

    const thumbEl = document.querySelector('.swiper.swiper--thumbs') as HTMLElement;
    thumbEl.style.width = `${160 * imagesArr.length}px`;
    document.querySelectorAll('.swiper--thumbs .swiper-slide').forEach((slide, index) => {
        slide.addEventListener('click', () => swiper.slideTo(index));
    });

    document.querySelectorAll('.swiper--main .swiper-slide').forEach((slide) => {
        slide.addEventListener('click', (e) => {
            if (!document.querySelector('.slider--full-screen')) {
                document.querySelector('.slider')?.classList.add('slider--full-screen');
                const targetElement = e.target as HTMLElement;
                const parentElement = targetElement.parentNode?.parentNode?.parentNode as HTMLElement;
                parentElement?.insertAdjacentHTML('beforebegin', `<div class='fs-close'>&times;</div>`);
            } else {
                offFullScreen();
            }
            document.querySelector('.fs-close')?.addEventListener('click', offFullScreen);
        });
    });
}

function offFullScreen() {
    document.querySelector('.slider')?.classList.remove('slider--full-screen');
    const closeBtn = document.querySelector('.fs-close');
    if (closeBtn) closeBtn.remove();
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

function imagesUrls(param: string): string[] {
    productImages.push(param);
    return productImages;
}
