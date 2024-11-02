import React from "react";
import ReactSlider from "react-slider"; 

function Filters({ filters, onFilterChange }) {

  const handlePriceChange = (values) => {
    onFilterChange({ ...filters, price: values });
  };

  return (
    <div className="filters">
      <h2>Filters</h2>

   
      <div>
        <label>Category</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
        >
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Footwear">Footwear</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>


      <div>
        <label>Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => onFilterChange({ ...filters, brand: e.target.value })}
        >
          <option value="">All</option>
          <option value="Brand A">Brand A</option>
          <option value="Brand B">Brand B</option>
          <option value="Brand C">Brand C</option>
          <option value="Brand D">Brand D</option>
          <option value="Brand E">Brand E</option>
        </select>
      </div>

      <div>
        <label>Price Range: ${filters.price[0]} - ${filters.price[1]}</label>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="thumb"
          trackClassName="track"
          value={filters.price}
          min={0}
          max={500}
          step={1}
          onChange={handlePriceChange}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
      </div>


      <div>
        <label>Minimum Rating</label>
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={filters.rating}
          onChange={(e) => onFilterChange({ ...filters, rating: parseFloat(e.target.value) || 0 })}
        />
      </div>
    </div>
  );
}

export default Filters;

