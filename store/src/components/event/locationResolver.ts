import { goPage } from '../../components/event/goPage';
import CatalogProduct from '../../pages/catalogProduct/catalogProduct';
import Main from '../../pages/main/main';
import AboutUs from '../../pages/aboutUs/aboutUs';
import NotFound from '../../pages/notFound/notFound';
import Basket from '../../pages/basket/basket';
import Registration from '../../pages/registration/registration';
import UserProfile from '../../pages/userProfile/userProfile';

export function locationResolver(location: string) {
    // const location = window.location.hash;
    // console.log(location, location === '#/catalog/');
    window.location.hash = location;

    switch (location) {
        case '#/main/':
            goPage(Main, 'body');
            break;

        case '#/catalog/':
            goPage(CatalogProduct);
            break;

        case '#/about/':
            goPage(AboutUs);
            break;

        case '#/cart/':
            goPage(Basket);
            break;

        case '#/registration/':
            goPage(Registration);
            break;

        case '#/profile/':
            goPage(UserProfile);
            break;

        default:
            goPage(NotFound);
            break;
    }
}
