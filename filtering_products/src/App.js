import React, { useState, useEffect } from "react";
import Filters from "./components/Filters";
import ProductList from "./components/ProductList";
import { ClipLoader } from "react-spinners";
import useDebounce from "./hooks/useDebounce"; 
import { mockData } from "./data/data";


function App() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    price: [0, 500],
    rating: 0,
  });
  const [sortCriteria, setSortCriteria] = useState("price");
  const [loading, setLoading] = useState(false);


  const debouncedFilters = useDebounce(filters, 500); 

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    const savedSort = localStorage.getItem("sortCriteria");

    if (savedFilters) setFilters(savedFilters);
    if (savedSort) setSortCriteria(savedSort);

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setProducts(mockData);
    setLoading(false);
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    localStorage.setItem("filters", JSON.stringify(updatedFilters));
  };

  const handleSortChange = (e) => {
    const criteria = e.target.value;
    setSortCriteria(criteria);
    localStorage.setItem("sortCriteria", criteria);
  };


  const filteredProducts = products.filter((product) => {
    const matchesCategory = debouncedFilters.category ? product.category === debouncedFilters.category : true;
    const matchesBrand = debouncedFilters.brand ? product.brand === debouncedFilters.brand : true;
    const matchesPrice = product.price >= debouncedFilters.price[0] && product.price <= debouncedFilters.price[1];
    const matchesRating = product.rating >= debouncedFilters.rating;

    return matchesCategory && matchesBrand && matchesPrice && matchesRating;
  });


  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortCriteria === "price") return a.price - b.price;
    if (sortCriteria === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="app">
      <Filters filters={filters} onFilterChange={handleFilterChange} />

      <div className="sort-options">
        <label>Sort by:</label>
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="price">Price (Low to High)</option>
          <option value="rating">Rating (High to Low)</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">
          <ClipLoader />
        </div>
      ) : (
        <ProductList products={sortedProducts} />
      )}

      {sortedProducts.length === 0 && !loading && <p>No products found</p>}
    </div>
  );
}

export default App;



