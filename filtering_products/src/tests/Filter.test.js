import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('filters products by category and brand', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Electronics' } });


  fireEvent.change(screen.getByLabelText(/Brand/i), { target: { value: 'Brand A' } });

 
  expect(screen.getByText(/Wireless Headphones/i)).toBeInTheDocument();
  expect(screen.queryByText(/Running Shoes/i)).not.toBeInTheDocument();
});
