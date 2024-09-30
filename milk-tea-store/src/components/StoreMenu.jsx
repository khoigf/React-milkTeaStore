import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import storeProductsData from '../data/storeProducts.json';
import './StoreMenu.css';

function StoreMenu({ storeId }) {
  const productList = productsData.products;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterToppings, setFilterToppings] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  // Topping options, this should ideally be dynamically generated based on products
  const availableToppings = ["Milk Foam", "White Pearl", "Pearl", "Aloe", "Milk"];

  useEffect(() => {
    // Filter products based on the selected storeId
    const storeProducts = storeProductsData.shopProducts
      .filter(sp => sp.shop === storeId)
      .map(sp => productList.find(product => product.id === sp.product))
      .filter(product => product !== undefined); // Ensure no undefined products

    setOriginalProducts(storeProducts); // Store the original products for filtering
    setFilteredProducts(storeProducts); // Set initial filtered products
  }, [storeId, productList]);

  const handleSort = (event) => {
    const sortBy = event.target.value;

    let sortedProducts = [...filteredProducts];
    if (sortBy === 'name-asc') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  const handleFilter = () => {
    if (filterToppings.length === 0) {
      setFilteredProducts(originalProducts);
      return;
    }

    const filtered = originalProducts.filter(product =>
      filterToppings.every(topping =>
        product.toppings.toLowerCase().includes(topping.toLowerCase())
      )
    );
    setFilteredProducts(filtered);
  };

  const handleToppingChange = (event) => {
    const topping = event.target.value;
    if (event.target.checked) {
      setFilterToppings([...filterToppings, topping]);
    } else {
      setFilterToppings(filterToppings.filter(t => t !== topping));
    }
  };

  const stores = ['Ding Tea', 'Tocotoco', 'Gongcha', 'LeeTee'];

  return (
    <div className="store-menu">
      <h2>{stores[storeId - 1]} Menu</h2>
      <div className="filter-sort">
        <div className="filter-section">
          <button onClick={handleFilter}>Filter</button>
        </div>
        <div className="sort-section">
          <h4>Sort By</h4>
          <select onChange={handleSort}>
            <option value="name-asc">Name (Asc)</option>
            <option value="name-desc">Name (Desc)</option>
            <option value="price-asc">Price (Asc)</option>
            <option value="price-desc">Price (Desc)</option>
          </select>
        </div>
      </div>
      <div className="filter-sort">
        <div className="filter-section2">
          <h3>Toppings:</h3>
          <div className="topping-checkboxes">
            {availableToppings.map((topping, index) => (
              <label key={index} className="topping-label">
                <input
                  type="checkbox"
                  value={topping  }
                  onChange={handleToppingChange}
                />
                {topping}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>Toppings: {product.toppings}</p>
              {product.id === 1 && <span className="trending">Trending</span>}
              <p className="price">${product.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No products match the filter criteria.</p>
        )}
      </div>
    </div>
  );
}

export default StoreMenu;
