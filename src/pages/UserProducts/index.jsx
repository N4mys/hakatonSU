import React, { useContext, useEffect } from "react";
import { productsContext } from "../../contexts/productContext";
import CustomCard from "../../components/Card";
import CustomPagination from "../../components/CustomPagination";
import { useSearchParams } from "react-router-dom";
import "./style.css";

const UserProducts = () => {
  const { products, getProducts, deleteProduct } = useContext(productsContext);
  const [searchParams] = useSearchParams();

  const onDelete = async (id) => {
    await deleteProduct(id);
    await getProducts();
  };

  // useEffect(() => {
  //   getProducts();
  // }, []);

  useEffect(() => {
    getProducts(
      searchParams.get("search"),
      searchParams.get("category"),
      searchParams.get("_page")
    );
  }, [searchParams]);

  return (
    <div className="products">
      <h3>My Products</h3>
      <div className="product-list">
        {products
          ? products.map((item) => (
              <CustomCard product={item} isUserProducts onDelete={onDelete} />
            ))
          : "Empty"}
      </div>
      <CustomPagination />
    </div>
  );
};

export default UserProducts;
