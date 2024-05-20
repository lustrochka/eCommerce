import Login from '../src/pages/login/login';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

jest.mock('../src/services/api/client.ts', () => jest.fn());

const page = new Login().getNode();
document.body.appendChild(page);

it('rendersCorrectly', async () => {
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
});

it('redirectToMainWhenGoodResponse', () => {
    const getUserEmail = jest.fn(() => Promise.resolve({ results: ['user'] }));
    const getUser = jest.fn(() => Promise.resolve({}));
    const btn = screen.getByText(/sign in/i);
    btn.removeAttribute('disabled');
    userEvent
        .click(btn)
        .then(() => waitFor(() => expect(screen.getByText(/кнопки снизу для теста!/i)).toBeInTheDocument()));
});

it('showErrorMessage', () => {
    const getUserEmail = jest.fn(() => Promise.resolve({ results: ['user'] }));
    const getUser = jest.fn(() => Promise.reject({ message: 'error-test' }));
    const btn = screen.getByText(/sign in/i);
    btn.removeAttribute('disabled');
    userEvent.click(btn).then(() => waitFor(() => expect(screen.getByText(/error-test/i)).toBeInTheDocument()));
});
