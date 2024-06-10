import Component from '../component/component';
import { checkAge } from '../../services/checkAge';
import Button from '../button/button';

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

    checkFormValidity(target: HTMLInputElement | HTMLSelectElement, submitBtn: HTMLButtonElement) {
        if (target.id === 'birth') {
            checkAge(target.value) ? target.setCustomValidity('') : target.setCustomValidity('irrelevant age');
        }
        if (target.nextElementSibling instanceof HTMLSpanElement) {
            target.checkValidity()
                ? target.nextElementSibling.classList.remove('visible')
                : target.nextElementSibling.classList.add('visible');
        }
        this.getNode().checkValidity()
            ? submitBtn.removeAttribute('disabled')
            : submitBtn.setAttribute('disabled', 'true');
    }
}

export default Form;
