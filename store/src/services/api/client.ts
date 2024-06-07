import {
    ClientBuilder,
    type AuthMiddlewareOptions,
    type HttpMiddlewareOptions,
    type PasswordAuthMiddlewareOptions,
    type ExistingTokenMiddlewareOptions,
    type RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import MyTokenCache from './tokenCache';
import { logout } from '../../components/event/logout';

const projectKey = 'aaa42';
const scopes = ['manage_project:aaa42'];
const authURL = 'https://auth.europe-west1.gcp.commercetools.com';
const Url = 'https://api.europe-west1.gcp.commercetools.com';
const clientId = 'vCUskG1cZ9kKm8U1rAw0vkJc';
const clientSecret = 'D9XILPrKIQu3lwIdk4oA0--EMz-_jyKI';

const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authURL,
    projectKey,
    credentials: {
        clientId,
        clientSecret,
    },
    scopes,
    fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: Url,
    fetch,
};

const options: PasswordAuthMiddlewareOptions = {
    host: authURL,
    projectKey,
    credentials: {
        clientId,
        clientSecret,
        user: {
            username: '',
            password: '',
        },
    },
    scopes,
    fetch,
    tokenCache: new MyTokenCache(),
};

const refreshOptions: RefreshAuthMiddlewareOptions = {
    host: authURL,
    projectKey,
    credentials: {
        clientId,
        clientSecret,
    },
    refreshToken: '',
    tokenCache: new MyTokenCache(),
    fetch,
};

let apiRoot: ByProjectKeyRequestBuilder;

class Client {
    buildWithExistingToken() {
        const existingToken = JSON.parse(localStorage.getItem('token') || '{}').token;
        const authorization: string = `Bearer ${existingToken}`;
        const options: ExistingTokenMiddlewareOptions = {
            force: true,
        };
        const ctpClient = new ClientBuilder()
            .withExistingTokenFlow(authorization, options)
            .withHttpMiddleware(httpMiddlewareOptions)
            // .withLoggerMiddleware()
            .build();

        apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
    }
    buildWithPasswordFlow(email: string, password: string) {
        options.credentials.user.username = email;
        options.credentials.user.password = password;

        const ctpClient = new ClientBuilder()
            .withPasswordFlow(options)
            .withHttpMiddleware(httpMiddlewareOptions)
            // .withLoggerMiddleware()
            .build();

        apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
    }
    buildWithCredentialsFlow() {
        const ctpClient = new ClientBuilder()
            .withClientCredentialsFlow(authMiddlewareOptions)
            .withHttpMiddleware(httpMiddlewareOptions)
            // .withLoggerMiddleware()
            .build();

        apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
    }
    buildWithRefreshToken() {
        const refreshToken = JSON.parse(localStorage.getItem('token') || '{}').refreshToken;
        refreshOptions.refreshToken = refreshToken;
        const ctpClient = new ClientBuilder()
            .withRefreshTokenFlow(refreshOptions)
            .withHttpMiddleware(httpMiddlewareOptions)
            // .withLoggerMiddleware()
            .build();

        apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
    }
    getApiRoot() {
        if (localStorage.getItem('token')) {
            const token = JSON.parse(localStorage.getItem('token') || '{}');
            if (token.expirationTime < Date.now()) {
                token.refreshToken ? this.buildWithRefreshToken() : logout();
            } else if (!apiRoot) this.buildWithExistingToken();
        } else if (!apiRoot) this.buildWithCredentialsFlow();
        return apiRoot;
    }
}

export default Client;
