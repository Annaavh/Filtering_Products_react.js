import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('updates product list in real time when filter values change', async () => {
  render(<App />);


  expect(screen.getAllByRole('img').length).toBeGreaterThan(1);

  
  fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Clothing' } });

  await waitFor(() => {
    expect(screen.getByText(/Leather Jacket/i)).toBeInTheDocument();
  });


  expect(screen.queryByText(/Wireless Headphones/i)).not.toBeInTheDocument();
});

test('displays "no products found" when no products match filter', () => {
  render(<App />);


  fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Toys' } });


  expect(screen.getByText(/No products found/i)).toBeInTheDocument();
});
