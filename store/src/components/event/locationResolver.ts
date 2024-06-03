import { goPage } from '../../components/event/goPage';
import CatalogProduct from '../../pages/catalogProduct/catalogProduct';
import Main from '../../pages/main/main';
import AboutUs from '../../pages/aboutUs/aboutUs';
import NotFound from '../../pages/notFound/notFound';
import Basket from '../../pages/basket/basket';
import Registration from '../../pages/registration/registration';
import UserProfile from '../../pages/userProfile/userProfile';
import { DetailedProduct } from '../../pages/detailedProduct/detailedProduct';
import { loadFromStorage } from '../../services/storage/storage';
import Login from '../../pages/login/login';
import { updatePage } from './updatePage';

export function locationResolver(location: string, isBtn: boolean = true) {
    switch (location) {
        case '/':
            goPage(Main, 'body');
            break;

        case '/catalog':
            goPage(CatalogProduct);
            break;

        case '/about':
            goPage(AboutUs);
            break;

        case '/cart':
            goPage(Basket);
            break;

        case '/login':
            if (loadFromStorage('eComData') && loadFromStorage('eComData').status) {
                new Router().changeUrl('/');
            } else {
                goPage(Login);
            }
            break;

        case '/registration':
            if (loadFromStorage('eComData') && loadFromStorage('eComData').status) {
                new Router().changeUrl('/');
            } else {
                goPage(Registration);
            }
            break;

        case '/profile':
            goPage(UserProfile);
            break;

        case '/product':
            goPage(DetailedProduct);
            break;
        default:
            goPage(NotFound);
            break;
    }

    if (isBtn) new Router().changeUrl(location);
    updatePage();
}

class Router {
    changeUrl(url: string) {
        window.history.pushState({}, '', url);
    }
}

function handleRouting() {
    locationResolver(window.location.pathname, false);
}

window.onpopstate = handleRouting;
