import Button from '../../components/button/button';
import { addItem, createCart } from '../../services/api/api';

class AddingButton extends Button {
    constructor(id: string) {
        super('add-to-basket-btn', 'Add to basket', {});
        this.setListener('click', () => {
            this.changeText('Added to basket');
            this.addAttributes({ disabled: 'true' });
            const cartId = localStorage.getItem('cartId') || localStorage.getItem('anonimCartId');
            if (cartId) {
                addItem(id, cartId, Number(localStorage.getItem('cartVersion'))).then(({ body }) =>
                    localStorage.setItem('cartVersion', body.version.toString())
                );
            } else {
                createCart().then(({ body }) => {
                    addItem(id, body.id, body.version).then(({ body }) =>
                        localStorage.setItem('cartVersion', body.version.toString())
                    );
                    localStorage.getItem('token')
                        ? localStorage.setItem('cartId', body.id)
                        : localStorage.setItem('anonimCartId', body.id);
                    localStorage.setItem('cartVersion', body.version.toString());
                });
            }
        });
    }
}

export default AddingButton;
