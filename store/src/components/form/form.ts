import Component from '../component/component';

class Form extends Component<HTMLFormElement> {
    constructor(className: string) {
        super('form', className);
    }

    getElementValue(index: number) {
        const element = this.getNode().elements[index];
        if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) return element.value;
        return '';
    }

    setElementValue(index: number, value: string) {
        const element = this.getNode().elements[index];
        if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) element.value = value;
    }
}

export default Form;
