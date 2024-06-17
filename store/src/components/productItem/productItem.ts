import { getCarts } from '../../services/api/api';
import { Trash } from '../../types';

export async function getCount() {
    let res;
    const count = document.querySelector('.header__div--hidden') as HTMLElement;
    await setStorage();
    if (String(sessionStorage.getItem('trash'))) {
        await setStorage();
        res = JSON.parse(String(sessionStorage.getItem('trash')));
    }
    if (res) {
        count.classList.add('cart-count');
        res.forEach((i: Trash) => getProductBasket(i.productId));
        count.textContent = JSON.parse(String(sessionStorage.getItem('trash'))).length;
    }
}
async function setStorage() {
    await getCarts().then(({ body }) =>
        body.results[0]?.lineItems
            ? sessionStorage.setItem('trash', JSON.stringify(body.results[0]?.lineItems))
            : sessionStorage.setItem('trash', JSON.stringify(null))
    );
}
function getProductBasket(param: string) {
    const arr = document.getElementById(param);
    if (arr?.children[4]) {
        addButton(arr?.children[4]);
    }
}

export function addButton(button: Element) {
    button.textContent = 'Added to basket';
    button.setAttribute('disabled', 'true');
}
