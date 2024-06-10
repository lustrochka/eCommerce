import { loadFromStorage, saveToStorage } from '../../services/storage/storage';
import Client from '../../services/api/client';
import { updatePage } from './updatePage';
import { locationResolver } from './locationResolver';

export function logout() {
    const loadedDate = loadFromStorage('eComData');
    saveToStorage('eComData', loadedDate.formData, false);
    localStorage.removeItem('token');
    localStorage.removeItem('version');
    new Client().buildWithCredentialsFlow();
    updatePage();
    locationResolver(window.location.pathname);
}
