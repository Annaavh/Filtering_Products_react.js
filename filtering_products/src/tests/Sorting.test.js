import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('sorts products by price in ascending order', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Sort by/i), { target: { value: 'price' } });

  const productPrices = screen.getAllByTestId('product-price').map((price) => parseFloat(price.textContent.replace('$', '')));

  const isSorted = productPrices.every((val, i, arr) => !i || arr[i - 1] <= val);
  expect(isSorted).toBe(true);
});
