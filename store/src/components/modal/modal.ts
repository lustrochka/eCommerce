class Modal {
    private modalElement: HTMLElement;
    private closeButton: HTMLElement;
    private okButton: HTMLElement;

    constructor() {
        this.modalElement = document.createElement('div');
        this.modalElement.classList.add('modal');
        this.closeButton = document.createElement('button');
        this.okButton = document.createElement('button');

        const content = document.createElement('div');
        content.classList.add('modal__content');

        this.closeButton.textContent = 'Close';
        this.closeButton.onclick = () => this.close();

        this.okButton.textContent = 'OK';
        this.okButton.onclick = () => this.close();

        content.appendChild(this.closeButton);
        content.appendChild(this.okButton);
        this.modalElement.appendChild(content);

        document.body.appendChild(this.modalElement);

        window.onclick = (event) => {
            if (event.target == this.modalElement) {
                this.close();
            }
        };
    }

    open() {
        this.modalElement.style.display = 'block';
    }

    close() {
        this.modalElement.style.display = 'none';
    }
}

export default Modal;
