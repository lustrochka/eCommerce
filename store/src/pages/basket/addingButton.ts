import Button from '../../components/button/button';
import { addItem, createCart } from '../../services/api/api';
import { Items } from '../../types';

class AddingButton extends Button {
    constructor(classname: string, attributes: Items, id: string) {
        super(classname, 'Add to basket', attributes);
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
