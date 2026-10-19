import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import api from './api/axios';

jest.mock('./api/axios', () => ({
  __esModule: true,
  default: { get: jest.fn() },
  laravelApi: { get: jest.fn() },
}));

const users = [
  { id: 1, name: 'Leanne Graham' },
  { id: 2, name: 'Ervin Howell' },
];

beforeEach(() => {
  api.get.mockReset();
  api.get.mockResolvedValue({ data: users });
  document.title = 'React App';
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders the simple page and loads user names through the API client', async () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'CarloJose' })).toBeInTheDocument();
  expect(screen.getByText('Pogi lang')).toBeInTheDocument();
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
  expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  expect(api.get).toHaveBeenCalledWith('/users', expect.objectContaining({
    signal: expect.any(Object),
  }));
});

test('increments the counter and updates the document title', async () => {
  render(<App />);
  await screen.findByText('Leanne Graham');

  expect(document.title).toBe('Count: 0');
  fireEvent.click(screen.getByRole('button', { name: 'Count: 0' }));

  expect(screen.getByRole('button', { name: 'Count: 1' })).toBeInTheDocument();
  expect(document.title).toBe('Count: 1');
});

test('submits the name entered in the controlled form', async () => {
  const log = jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<App />);
  await screen.findByText('Leanne Graham');

  const nameInput = screen.getByRole('textbox', { name: 'Name' });
  fireEvent.change(nameInput, { target: { value: 'Maria' } });
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(nameInput).toHaveValue('Maria');
  expect(log).toHaveBeenCalledWith('Form submitted with name:', 'Maria');
});

test('shows an error message when loading users fails', async () => {
  api.get.mockRejectedValueOnce(new Error('Network unavailable'));
  render(<App />);

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Unable to load users. Please try again later.'
  );
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument();
});
