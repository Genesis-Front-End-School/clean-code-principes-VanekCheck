import { fireEvent, render, screen } from '@testing-library/react';
import nock from 'nock';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BASE_URL } from 'src/constants/api';
import Navbar from './Navbar';

jest.mock('src/store/useAuthStore');
jest.mock('src/services');

const logout = jest.fn();

const mockedApi = nock(BASE_URL);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('Navbar Component', () => {
  test('renders the sign in button when user is not logged in', () => {
    const useAuthStoreMock = jest.fn(() => ({ isLogged: false, logout }));
    jest
      .spyOn(require('src/store/useAuthStore'), 'useAuthStore')
      .mockImplementation(useAuthStoreMock);

    mockedApi.get('/auth/anonymous?platform=subscriptions').reply(200, {
      token: 'test-token',
    });
    render(<Navbar />, { wrapper });

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
  });

  test('renders the user name when user is logged in', () => {
    const useAuthStoreMock = jest.fn(() => ({ isLogged: true, logout }));
    jest
      .spyOn(require('src/store/useAuthStore'), 'useAuthStore')
      .mockImplementation(useAuthStoreMock);

    render(<Navbar />, { wrapper });

    const userNameText = screen.getByText('Anonymous');
    expect(userNameText).toBeInTheDocument();
  });

  test('calls the logout function when sign out button is clicked', () => {
    const useAuthStoreMock = jest.fn(() => ({ isLogged: true, logout }));
    jest
      .spyOn(require('src/store/useAuthStore'), 'useAuthStore')
      .mockImplementation(useAuthStoreMock);

    render(<Navbar />, { wrapper });

    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    fireEvent.click(signOutButton);

    expect(logout).toHaveBeenCalledTimes(1);
  });
});
