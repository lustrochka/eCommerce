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
        const refreshToken = newCache.refreshToken ? newCache.refreshToken : this.#cache.refreshToken;
        this.#cache.token = newCache.token;
        this.#cache.refreshToken = refreshToken;
        this.#cache.expirationTime = Date.now() + Number(newCache.expirationTime);
        localStorage.setItem('token', JSON.stringify(this.#cache));
    }
}

export default MyTokenCache;
