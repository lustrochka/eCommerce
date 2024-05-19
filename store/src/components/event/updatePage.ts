import { loadFromStorage } from '../../services/storage/storage';
export function updatePage() {
    const data = loadFromStorage('eComData');
    if (data.status) {
        (document.querySelector('#button-login') as HTMLElement).style.display = 'none';
        (document.querySelector('#button-registration') as HTMLElement).style.display = 'none';
        (document.querySelector('#button-logout') as HTMLElement).style.display = 'block';
        (document.querySelector('#button-profile') as HTMLElement).style.display = 'block';
    } else {
        (document.querySelector('#button-login') as HTMLElement).style.display = 'block';
        (document.querySelector('#button-registration') as HTMLElement).style.display = 'block';
        (document.querySelector('#button-logout') as HTMLElement).style.display = 'none';
        (document.querySelector('#button-profile') as HTMLElement).style.display = 'none';
    }
    console.log('123');
}
