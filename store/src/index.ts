import Main from './pages/main/main';
// import Registration from './pages/registration/registration';
import '../src/styles/style.css';
import '../src/styles/main.css';

// document.body.appendChild(new Main().getNode());
// document.body.appendChild(new Registration().getNode());

import { locationResolver } from './components/event/locationResolver';
document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(new Main().getNode());
    locationResolver(window.location.hash);
    // console.log('window.location.hash', window.location.hash);
});
