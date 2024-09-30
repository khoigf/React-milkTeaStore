import React, { useState } from 'react';
import './App.css';
import StoreMenu from './components/StoreMenu';
import storesData from './data/stores.json';

function App() {
  const [selectedStore, setSelectedStore] = useState(storesData.stores[0].id);

  return (
    <div className="App">
      <aside className="sidebar">
        <h1>Milk Tea Store</h1>
        <ul>
          {storesData.stores.map(store => (
            <li
              key={store.id}
              className={selectedStore === store.id ? 'active' : ''}
              onClick={() => setSelectedStore(store.id)}
            >
              {store.name}
            </li>
          ))}
        </ul>
      </aside>
      <main className="main-content">
        <StoreMenu storeId={selectedStore} />
      </main>
    </div>
  );
}

export default App;
