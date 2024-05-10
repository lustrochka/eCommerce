import Component from '../../components/component/component';
import { div } from '../../components/tags/tags';
// import Button from '../../components/button/button';

class AboutUs extends Component {
    constructor() {
        super('div', 'profile');
        const title = div('about-us__title');
        title.changeText('About Us');
        this.appendChildren(title);
    }
}

export default AboutUs;
