import CatalogProduct from '../src/pages/catalogProduct/catalogProduct';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/dom';

jest.mock('../src/services/api/client.ts', () => jest.fn());
jest.mock('../src/pages/detailedProduct/detailedProduct.ts', () => jest.fn());
jest.mock('../src/services/api/api.ts', () => ({
    getProducts: jest.fn(() =>
        Promise.resolve({
            body: {
                results: [
                    {
                        masterData: {
                            current: { name: { 'en-GB': 'Something' }, description: 'Lorem ipsum dolor sit amet' },
                        },
                    },
                    {
                        masterData: {
                            current: { name: { 'en-GB': 'Another' }, description: 'consectetur adipiscing elit' },
                        },
                    },
                ],
            },
        })
    ),
    updateUser: jest.fn(() => Promise.resolve({})),
}));

const page = new CatalogProduct().getNode();
document.body.appendChild(page);

it('rendersCorrectly', async () => {
    waitFor(() => expect(screen.getByText(/Something/i)).toBeInTheDocument());
    waitFor(() => expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument());
    waitFor(() => expect(screen.getByText(/Another/i)).toBeInTheDocument());
    waitFor(() => expect(screen.getByText(/consectetur adipiscing elit/i)).toBeInTheDocument());
});
