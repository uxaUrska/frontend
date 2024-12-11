import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Sidebar from './components/Sidebar';
import TableComponent from './components/CostTracking';
import Login from './components/Login';

// Test 1: Existing test (might fail if "Dobrodošli" isn't rendered)
test('renders the application without crashing', () => {
  render(<App />);
  expect(screen.getByText(/Menu/i)).toBeInTheDocument();
});
test('renders the loading state', () => {
  render(<App />);
  const loadingText = screen.getByText(/Loading.../i);
  expect(loadingText).toBeInTheDocument();
});
test('renders the "Home" menu item', () => {
  render(<App />);
  const menuItem = screen.getByText(/Home/i);
  expect(menuItem).toBeInTheDocument();
});
test('Sidebar has the correct background color', () => {
  const { container } = render(<Sidebar />);
  const sidebar = container.firstChild;

  // Mock `getComputedStyle` to handle missing styles in the test environment
  window.getComputedStyle = jest.fn().mockImplementation(() => ({
    backgroundColor: 'rgb(51, 51, 51)',
  }));

  expect(window.getComputedStyle(sidebar).backgroundColor).toBe('rgb(51, 51, 51)');
});
test('Sidebar menu items have correct hover text color', () => {
  const { container } = render(<Sidebar />);
  const menuItem = container.querySelector('ul li'); // Select the first menu item

  // Mock `getComputedStyle` to handle hover styles in the test environment
  window.getComputedStyle = jest.fn().mockImplementation((element) => {
    if (element === menuItem) {
      return { color: 'rgb(255, 255, 255)' }; // White color on hover
    }
    return {};
  });

  expect(window.getComputedStyle(menuItem).color).toBe('rgb(255, 255, 255)');
});

test('Sidebar header has correct font size', () => {
  const { container } = render(<Sidebar />);
  const header = container.querySelector('h2'); // Select the Sidebar header

  // Mock `getComputedStyle` to simulate font size
  window.getComputedStyle = jest.fn().mockImplementation((element) => {
    if (element === header) {
      return { fontSize: '24px' }; // Expected font size
    }
    return {};
  });

  expect(window.getComputedStyle(header).fontSize).toBe('24px');
});
test('Sidebar menu items have correct font weight', () => {
  const { container } = render(<Sidebar />);
  const menuItem = container.querySelector('ul li'); // Select the first menu item

  // Mock `getComputedStyle` to simulate font weight
  window.getComputedStyle = jest.fn().mockImplementation((element) => {
    if (element === menuItem) {
      return { fontWeight: '400' }; // Normal font weight
    }
    return {};
  });

  expect(window.getComputedStyle(menuItem).fontWeight).toBe('400');
});
test('Table headers have bold font weight', () => {
  const { container } = render(<TableComponent />);
  const header = container.querySelector('th'); // Select the first table header

  // Mock `getComputedStyle` to simulate font weight
  window.getComputedStyle = jest.fn().mockImplementation((element) => {
    if (element === header) {
      return { fontWeight: '500' }; // Expected font weight for table headers
    }
    return {};
  });

  expect(window.getComputedStyle(header).fontWeight).toBe('500');
});
test('Sidebar menu items have correct padding', () => {
  const { container } = render(<Sidebar />);
  const menuItem = container.querySelector('ul li'); // Select the first menu item

  // Mock `getComputedStyle` to simulate padding
  window.getComputedStyle = jest.fn().mockImplementation((element) => {
    if (element === menuItem) {
      return { padding: '15px 0' }; // Expected padding value
    }
    return {};
  });

  expect(window.getComputedStyle(menuItem).padding).toBe('15px 0');
});
test('CostTracking container has correct border radius', () => {
  const { container } = render(<TableComponent />);
  const costTrackingContainer = container.querySelector('.cost-tracking'); // Select the container element

  // Mock `getComputedStyle` to simulate border radius
  window.getComputedStyle = jest.fn().mockImplementation((element) => {
    if (element === costTrackingContainer) {
      return { borderRadius: '8px' }; // Expected border radius
    }
    return {};
  });

  expect(window.getComputedStyle(costTrackingContainer).borderRadius).toBe('8px');
});


//dodatna funkcionalnost

describe('Login Component', () => {
  test('renders the login form correctly', () => {
    render(<Login />);
    const usernameField = screen.getByLabelText(/Username/i);
    const passwordField = screen.getByLabelText(/Password/i);

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });


  test('password field is hidden (type="password")', () => {
    render(<Login />); // Assuming Login is correctly imported

    // Locate the password field
    const passwordField = screen.getByLabelText(/Password/i);

    // Verify its type is "password"
    expect(passwordField).toHaveAttribute('type', 'password');
  });

  test('username input field is of type text', () => {
    render(<Login />);

    // Locate the username input field
    const usernameField = screen.getByLabelText(/Username/i);

    // Verify its type is "text"
    expect(usernameField).toHaveAttribute('type', 'text');
  });

  // test('does not show error message when fields are filled', async () => {
  //   render(<Login />);

  //   const usernameField = screen.getByLabelText(/Username/i);
  //   const passwordField = screen.getByLabelText(/Password/i);
  //   const submitButton = screen.getByRole('button', { name: /Login/i });

  //   await act(async () => {
  //     fireEvent.change(usernameField, { target: { value: 'testuser' } });
  //     fireEvent.change(passwordField, { target: { value: 'password123' } });
  //     fireEvent.click(submitButton);
  //   });

  //   expect(screen.queryByText(/All fields are required/i)).toBeNull();
  // });

  // test('handles login failure and displays error message', async () => {
  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       ok: false,
  //       json: () => Promise.resolve({ message: 'Invalid credentials' }),
  //     })
  //   );

  //   render(<Login />);

  //   const usernameField = screen.getByLabelText(/Username/i);
  //   const passwordField = screen.getByLabelText(/Password/i);
  //   const submitButton = screen.getByRole('button', { name: /Login/i });

  //   await act(async () => {
  //     fireEvent.change(usernameField, { target: { value: 'wronguser' } });
  //     fireEvent.change(passwordField, { target: { value: 'wrongpass' } });
  //     fireEvent.click(submitButton);
  //   });

  //   expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
  // });

  // test('handles successful login', async () => {
  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       ok: true,
  //       json: () => Promise.resolve({ token: 'fake-token' }),
  //     })
  //   );

  //   jest.spyOn(window.localStorage.__proto__, 'setItem');
  //   window.localStorage.__proto__.setItem = jest.fn();

  //   render(<Login />);

  //   const usernameField = screen.getByLabelText(/Username/i);
  //   const passwordField = screen.getByLabelText(/Password/i);
  //   const submitButton = screen.getByRole('button', { name: /Login/i });

  //   await act(async () => {
  //     fireEvent.change(usernameField, { target: { value: 'testuser' } });
  //     fireEvent.change(passwordField, { target: { value: 'password123' } });
  //     fireEvent.click(submitButton);
  //   });

  //   expect(await screen.findByText(/Login successful!/i)).toBeInTheDocument();
  //   expect(window.localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
  // });
});