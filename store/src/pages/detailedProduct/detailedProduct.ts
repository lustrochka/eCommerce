import Component from '../../components/component/component';
import Button from '../../components/button/button';
import { div, span, p, img } from '../../components/tags/tags';
import { getProduct } from '../../services/api/productApi';
import { Product } from '../../types';
import { initSwiper, generateSwiperHTML } from './productSlider';
import { addItem, getCarts } from '../../services/api/api';
import './detailedProduct.css';

const description = {
    'Screen Size': '15.6" diagonal, FHD (1920 x 1080) 60Hz Display',
    'Operating system': 'Windows 11 Home',
    Processor: 'Intel® Core™ i7-13800H',
    'Video Card': 'NVIDIA RTX™ 2000 Ada',
    RAM: '32 GB: 2 x 16 GB',
    'Memory Speed': '2400 MHz',
    Storage: '512 GB',
    'Hard Drive Interface': 'PCIE x 4',
    'Tech Specs': '1 x USB Type-A 3.0, 1 x USB Type-A 2.0, 1 x USB Type-C, 1 x HDMI',
    Height: '1.55 cm',
    Width: '31.26 cm',
    Thickness: '22.12 cm',
    'Item Weight': '1.63 kg',
    'Optical Drive Type': 'no dvd',
    'Wireless Type': 'Bluetooth',
    'Power Source': 'AC & Battery',
    Voltage: '3.6 Volts',
};
let productImages: string[];
let productIdString: string;
export class DetailedProduct extends Component {
    constructor() {
        super('div', 'product');
        this.init();
    }

    init() {
        const productId = String(localStorage.getItem('product'));
        getProduct(productId)
            .then(({ body }) => {
                productIdString = body.id;
                const numDiscount = body.masterData.current.masterVariant.prices?.[0].discounted?.value;
                const numPrice = body.masterData.current.masterVariant.prices?.[0].value;
                const product = {
                    title: body.masterData.current.name['en-GB'] ? body.masterData.current.name['en-GB'] : '',
                    picture: body.masterData.current.masterVariant.images?.[0].url
                        ? body.masterData.current.masterVariant.images?.[0].url
                        : '',
                    description: body.masterData.current.description?.['en-GB']
                        ? body.masterData.current.description?.['en-GB']
                        : '',
                    price: numPrice?.centAmount ? String(numPrice?.centAmount / 100) : '',
                    discount: numDiscount?.centAmount ? String(numDiscount?.centAmount / 100) : '',
                };
                productImages = [];
                body.masterData.current.masterVariant.images?.forEach((el) => {
                    imagesUrls(el.url);
                });
                this.getPage(product, productImages);
            })
            .catch((e) => console.error(e.message));
    }
    getPage(product: Product, arr: string[]) {
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
                            new Button(
                                'product__button product__button--add button',
                                'add to cart',
                                {
                                    type: 'button',
                                },
                                addToCart
                            ),
                            new Button(
                                'product__button product__button--remove button button--hidden',
                                'remove from cart',
                                {
                                    type: 'button',
                                },
                                removeFromCart
                            )
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
        checkCart();
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

function imagesUrls(param: string): string[] {
    productImages.push(param);
    return productImages;
}

function checkCart() {
    const CID = getCarts();
    CID.then(
        function (body) {
            const cartList = body.body.results[0].lineItems;
            cartList.forEach((element) => {
                if (element.productId == productIdString) {
                    document.querySelector('.product__button--add')?.classList.add('button--hidden');
                    document.querySelector('.product__button--remove')?.classList.remove('button--hidden');
                }
            });
        },
        function (error) {
            console.error('Нет корзины', error);
        }
    );
}

function addToCart() {
    const CID = getCarts();
    CID.then(
        function (body) {
            const version = body.body.results[0].version;
            const cartId = body.body.results[0].id;
            if (productIdString && cartId) {
                // const versionNew = body.body.results[0].version;
                addItem(productIdString, cartId, version);
                localStorage.setItem('cartVersion', (version + 4).toString());
                document.querySelector('.product__button--add')?.classList.add('button--hidden');
                document.querySelector('.product__button--remove')?.classList.remove('button--hidden');
            }
        },
        function (error) {
            console.error('Нет корзины', error);
        }
    );
}

function removeFromCart() {
    const CID = getCarts();
    CID.then(
        function (body) {
            const cartList = body.body.results[0].lineItems;
            cartList.forEach((element) => {
                if (element.productId == productIdString) {
                    console.log('есть контакт!!');
                }
            });
        },
        function (error) {
            console.error('Нет корзины', error);
        }
    );
}
