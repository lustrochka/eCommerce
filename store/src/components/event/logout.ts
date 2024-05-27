import { loadFromStorage, saveToStorage } from '../../services/storage/storage';
import Client from '../../services/api/client';
import { updatePage } from './updatePage';

export function logout() {
    const loadedDate = loadFromStorage('eComData');
    saveToStorage('eComData', loadedDate.formData, false);
    localStorage.removeItem('token');
    localStorage.removeItem('version');
    new Client().buildWithCredentialsFlow();
    updatePage();
}
