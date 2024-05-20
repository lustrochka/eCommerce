import Main from './pages/main/main';
import '../src/styles/style.css';
import '../src/styles/main.css';
import { locationResolver } from './components/event/locationResolver';
import { updatePage } from './components/event/updatePage';

window.onload = () => {
    document.body.appendChild(new Main().getNode());
    locationResolver(window.location.pathname, false);
    updatePage();
};
