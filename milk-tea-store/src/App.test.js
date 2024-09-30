import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import storesData from './data/stores.json';

// Mock the StoreMenu component since we are focusing on App behavior
jest.mock('./components/StoreMenu', () => ({ storeId }) => <div>Store Menu for {storeId}</div>);

test('renders Milk Tea Store title and store list', () => {
  render(<App />);

  // Check if the title is rendered
  const titleElement = screen.getByText(/milk tea store/i);
  expect(titleElement).toBeInTheDocument();

  // Check if all stores are rendered in the sidebar
  storesData.stores.forEach(store => {
    const storeElement = screen.getByText(store.name);
    expect(storeElement).toBeInTheDocument();
  });
});

test('changes selected store when a store is clicked', () => {
  render(<App />);

  // Initially, the first store should be selected
  const firstStoreElement = screen.getByText(storesData.stores[0].name);
  expect(firstStoreElement).toHaveClass('active');

  // Click on another store
  const secondStoreElement = screen.getByText(storesData.stores[1].name);
  fireEvent.click(secondStoreElement);

  // The first store should no longer be active, and the second store should be active
  expect(firstStoreElement).not.toHaveClass('active');
  expect(secondStoreElement).toHaveClass('active');
});

test('renders StoreMenu with the selected storeId', () => {
  render(<App />);

  // Check that StoreMenu renders with the initial store
  const initialStoreMenu = screen.getByText(`Store Menu for ${storesData.stores[0].id}`);
  expect(initialStoreMenu).toBeInTheDocument();

  // Click on the second store
  const secondStoreElement = screen.getByText(storesData.stores[1].name);
  fireEvent.click(secondStoreElement);

  // Check that StoreMenu now renders the second store's menu
  const updatedStoreMenu = screen.getByText(`Store Menu for ${storesData.stores[1].id}`);
  expect(updatedStoreMenu).toBeInTheDocument();
});
