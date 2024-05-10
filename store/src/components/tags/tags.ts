import Component from '../component/component';

export const div = (className: string, ...children: Component[]) => new Component('div', className, ...children);

export const p = (className: string, text: string, ...children: Component[]) => {
    const element = new Component('p', className, ...children);
    element.changeText(text);
    return element;
};

export const span = (className: string, text: string, ...children: Component[]) => {
    const element = new Component('span', className, ...children);
    element.changeText(text);
    return element;
};

export const option = (className: string, text: string) => {
    const element = new Component('option', className);
    element.changeText(text);
    element.addAttributes({ value: text });
    return element;
};

//
export const main = (className: string, ...children: Component[]) => new Component('main', className, ...children);
export const img = (className: string, src: string, alt: string, ...children: Component[]) => {
    const element = new Component('img', className, ...children);
    element.addAttributes({ src: src });
    element.addAttributes({ alt: alt });
    return element;
};
export const a = (className: string, href: string, text: string, ...children: Component[]) => {
    const element = new Component('a', className, ...children);
    element.changeText(text);
    element.addAttributes({ href: href });
    return element;
};
