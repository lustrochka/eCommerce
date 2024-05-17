import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
    #cache: TokenStore;

    constructor() {
        this.#cache = {
            expirationTime: 0,
            refreshToken: undefined,
            token: '',
        };
    }
    get() {
        return this.#cache;
    }
    set(newCache: TokenStore) {
        console.log(newCache);
        this.#cache = newCache;
        localStorage.setItem('token', JSON.stringify(newCache));
    }
}

export default MyTokenCache;
