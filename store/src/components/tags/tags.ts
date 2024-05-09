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
