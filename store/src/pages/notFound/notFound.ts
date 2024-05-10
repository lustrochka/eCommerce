import Component from '../../components/component/component';
import { div } from '../../components/tags/tags';
// import Button from '../../components/button/button';

class NotFound extends Component {
    constructor() {
        super('div', 'not-found');
        const title = div('not-found__title');
        title.changeText('404 (Not Found) Page');
        this.appendChildren(title);
    }
}

export default NotFound;
