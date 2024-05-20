import Registration from '../src/pages/registration/registration';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

jest.mock('../src/services/api/client.ts', () => jest.fn());

it('rendersCorrectly', async () => {
    const page = new Registration().getNode();
    document.body.appendChild(page);
    expect(screen.getByText(/register/i)).toBeInTheDocument();
});
