import Main from '../../pages/main/main';
interface Page {
    getNode: () => HTMLElement;
}

export function goPage(Page: new () => Page, selector = 'main') {
    const element = document.querySelector(selector);
    const container = element?.querySelector('.container');
    if (selector == 'main') {
        if (container) {
            container.innerHTML = '';
        }
        container?.appendChild(new Page().getNode());
    }
    if (selector == 'body') {
        const body = document.querySelector('body');
        if (body) {
            body.innerHTML = '';
        }
        body?.appendChild(new Main().getNode());
    }
}
