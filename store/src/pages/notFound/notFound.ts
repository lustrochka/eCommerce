import Button from '../../components/button/button';
import Component from '../../components/component/component';
import { div, p } from '../../components/tags/tags';
import { locationResolver } from '../../components/event/locationResolver';

class NotFound extends Component {
    constructor() {
        super('div', 'not-found');
        const title = div('not-found__title');
        title.changeText('404 Page not found!');
        this.appendChildren(
            title,
            p(
                'not-found__text',
                'Sorry, the page you are looking for could not be found. It may have been deleted or you may have entered an incorrect address.'
            ),
            p('not-found__text', '— Site team'),
            new Button('not-found__button button', 'Go back to main page', { type: 'button' }, () =>
                locationResolver('#/main/')
            )
        );
    }
}

export default NotFound;

// import Main from '../../pages/main/main';
// function goMain() {
//     goPage(Main, 'body');
// }
