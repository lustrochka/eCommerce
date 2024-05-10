import Component from '../../components/component/component';
import { div } from '../../components/tags/tags';
// import Button from '../../components/button/button';

class UserProfile extends Component {
    constructor() {
        super('div', 'profile');
        const title = div('profile__title');
        title.changeText('User Profile');
        this.appendChildren(title);
    }
}

export default UserProfile;
