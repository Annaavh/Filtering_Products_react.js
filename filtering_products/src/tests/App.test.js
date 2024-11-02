import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the main components', () => {
  render(<App />);


  expect(screen.getByText(/Filters/i)).toBeInTheDocument();

  expect(screen.getByText(/No products found/i)).toBeInTheDocument();
});
