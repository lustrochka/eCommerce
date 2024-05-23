import Main from './pages/main/main';
import '../src/styles/style.css';
import '../src/styles/main.css';
import { locationResolver } from './components/event/locationResolver';
import { updatePage } from './components/event/updatePage';
import Client from './services/api/client';

window.onload = () => {
    document.body.appendChild(new Main().getNode());
    locationResolver(window.location.pathname, false);
    updatePage();
    if (localStorage.getItem('token')) {
        const token = JSON.parse(localStorage.getItem('token') || '{}');
        token.expirationTime < Date.now()
            ? new Client().buildWithRefreshToken()
            : new Client().buildWithExistingToken();
    }
};
