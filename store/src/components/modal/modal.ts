import { loadFromStorage } from '../../services/storage/storage';
import { saveToStorage } from '../../services/storage/storage';
import { updatePage } from '../event/updatePage';
import Client from '../../services/api/client';

class Modal {
    private modalElement: HTMLElement;

    constructor() {
        this.modalElement = this.createElement('div', 'modal');
        const modal = this.createElement('div', 'modal__header', 'Log out');
        const message = this.createElement('div', 'modal__text', 'Are you sure you want to log out of your account?');
        const closeButton = this.createElement('button', 'modal__button', 'Close');
        closeButton.dataset.action = 'close';
        const okButton = this.createElement('button', 'modal__button', 'OK');
        okButton.dataset.action = 'logout';

        const content = this.createElement('div', 'modal__content');
        const buttonWrap = this.createElement('div', 'modal__button-wrap');

        content.appendChild(modal);
        content.appendChild(message);
        buttonWrap.appendChild(closeButton);
        buttonWrap.appendChild(okButton);
        content.appendChild(buttonWrap);
        this.modalElement.appendChild(content);

        document.body.appendChild(this.modalElement);

        this.modalElement.addEventListener('click', (event) => {
            if (event.target == this.modalElement || (event.target as HTMLElement).dataset.action === 'close') {
                this.close();
            } else if (event.target == this.modalElement || (event.target as HTMLElement).dataset.action === 'logout') {
                this.logout();
            }
        });
    }

    private createElement(tagName: string, className = '', textContent = ''): HTMLElement {
        const element = document.createElement(tagName);
        if (className) element.classList.add(className);
        if (textContent) element.textContent = textContent;
        return element;
    }

    open() {
        this.modalElement.style.display = 'block';
    }

    close() {
        this.modalElement.style.display = 'none';
        console.log('close');
    }

    logout() {
        this.modalElement.style.display = 'none';
        const loadedDate = loadFromStorage('eComData');
        saveToStorage('eComData', loadedDate.formData, false);
        localStorage.removeItem('token');
        localStorage.removeItem('version');
        new Client().buildWithCredentialsFlow();
        updatePage();
    }
}

export default Modal;
