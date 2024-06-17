import Component from '../../components/component/component';
import { div, img } from '../../components/tags/tags';

import 'swiper/css';
import 'swiper/css/navigation';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
Swiper.use([Navigation, Pagination]);

export function initSwiper(imagesArr: string[]) {
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
                // if (document.querySelector('.container')) {
                document.querySelector('body')?.classList.add('overflow-hidden');
                // }
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

export function generateSwiperHTML(imageUrls: string[]): Component<HTMLElement>[] {
    const swiperSlides: Component<HTMLElement>[] = [];
    imageUrls.forEach((url) => {
        swiperSlides.push(div(`swiper-slide`, img('product__image', url, '')));
    });
    return swiperSlides;
}

function offFullScreen() {
    document.querySelector('.slider')?.classList.remove('slider--full-screen');
    document.querySelector('body')?.classList.remove('overflow-hidden');
    const closeBtn = document.querySelector('.fs-close');
    if (closeBtn) closeBtn.remove();
}
