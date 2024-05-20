import Registration from '../src/pages/registration/registration';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

jest.mock('../src/services/api/client.ts', () => jest.fn());

const page = new Registration().getNode();
document.body.appendChild(page);

it('rendersCorrectly', async () => {
    expect(screen.getByText(/register/i)).toBeInTheDocument();
});

it('redirectToMainWhenGoodResponse', () => {
    const createCustomer = jest.fn(() => Promise.resolve({ data: {} }));
    const btn = screen.getByText(/register/i);
    btn.removeAttribute('disabled');
    userEvent
        .click(btn)
        .then(() => waitFor(() => expect(screen.getByText(/кнопки снизу для теста!/i)).toBeInTheDocument()));
});

it('showErrorMessage', () => {
    const createCustomer = jest.fn(() => Promise.reject({ message: 'error-test' }));
    const btn = screen.getByText(/register/i);
    btn.removeAttribute('disabled');
    userEvent.click(btn).then(() => waitFor(() => expect(screen.getByText(/error-test/i)).toBeInTheDocument()));
});
