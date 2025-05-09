import UserProfile from '../src/pages/userProfile/userProfile';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

jest.mock('../src/services/api/client.ts', () => jest.fn());
jest.mock('../src/services/api/api.ts', () => ({
    getUserData: jest.fn(() =>
        Promise.resolve({
            body: {
                data: {
                    firstName: 'John',
                    lastName: 'Doe',
                    dateOfBirth: '2000-01-01',
                    email: 'aaa@aaa.aa',
                },
            },
        })
    ),
    updateUser: jest.fn(() => Promise.resolve({})),
}));

const page = new UserProfile().getNode();
document.body.appendChild(page);

it('rendersCorrectly', async () => {
    waitFor(() => expect(screen.getByText(/John/i)).toBeInTheDocument());
    waitFor(() => expect(screen.getByText(/Doe/i)).toBeInTheDocument());
    waitFor(() => expect(screen.getByText(/01.01.2000/i)).toBeInTheDocument());
});

it('changes user data', async () => {
    const btn = document.querySelector('edit-icon') as Element;
    userEvent
        .click(btn)
        .then(() => {
            userEvent.type(screen.getByLabelText(/First name/i), 'Jennifer');
            userEvent.click(screen.getByText(/Save/i));
        })
        .then(() => waitFor(() => expect(screen.getByText(/Jennifer/i)).toBeInTheDocument()));
});

it('validates user password when changing', async () => {
    userEvent.click(screen.getByText(/change password/i)).then(() => {
        userEvent.type(screen.getByLabelText(/current password/i), '123');
        expect(screen.getByText(/Password should have/i)).toBeInTheDocument();
    });
});
