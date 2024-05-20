import {
    ClientBuilder,
    type AuthMiddlewareOptions,
    type HttpMiddlewareOptions,
    type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import MyTokenCache from './tokenCache';

const projectKey = 'aaa42';
const scopes = ['manage_project:aaa42'];

const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
        clientId: 'vCUskG1cZ9kKm8U1rAw0vkJc',
        clientSecret: 'D9XILPrKIQu3lwIdk4oA0--EMz-_jyKI',
    },
    scopes,
    fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
};

const options: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
        clientId: 'vCUskG1cZ9kKm8U1rAw0vkJc',
        clientSecret: 'D9XILPrKIQu3lwIdk4oA0--EMz-_jyKI',
        user: {
            username: '',
            password: '',
        },
    },
    scopes,
    fetch,
    tokenCache: new MyTokenCache(),
};

let apiRoot: ByProjectKeyRequestBuilder;

class Client {
    buildWithPasswordFlow(email: string, password: string) {
        options.credentials.user.username = email;
        options.credentials.user.password = password;
        const ctpClient = new ClientBuilder()
            .withPasswordFlow(options)
            .withHttpMiddleware(httpMiddlewareOptions)
            .withLoggerMiddleware()
            .build();
        apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
    }
    buildWithCredentialsFlow() {
        const ctpClient = new ClientBuilder()
            .withClientCredentialsFlow(authMiddlewareOptions)
            .withHttpMiddleware(httpMiddlewareOptions)
            .withLoggerMiddleware()
            .build();

        apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
    }
    getApiRoot() {
        return apiRoot;
    }
}

export default Client;
