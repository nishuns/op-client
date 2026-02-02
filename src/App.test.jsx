import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

test('renders opinion polls title', async () => {
  axios.get.mockResolvedValue({ data: { title: 'Test Title' } });
  
  render(<App />);
  const titleElement = screen.getByText(/opinion polls/i);
  expect(titleElement).toBeInTheDocument();
  
  // Wait for the effect to potentially run, though we aren't testing the title change explicitly here
  // avoiding "not wrapped in act" warnings if promise resolves
  await waitFor(() => expect(axios.get).toHaveBeenCalled());
});