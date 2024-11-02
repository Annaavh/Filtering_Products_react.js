import React from "react";

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.imageUrl} alt={product.name} />
          <h4>{product.name}</h4>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Rating: {product.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;

