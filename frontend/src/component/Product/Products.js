import React, { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";



const categories = [
  "Lithium-ion",
  "Lithium-phosphate",
  "Solar panel",
  "Solar inverter",
  "Hybrid Inverter",
  "Laptop"
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category,setCategory] = useState("");
  const [ratings,setRatings] = useState(0);

  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price,category,ratings));
  }, [dispatch, error, alert, keyword, currentPage, price,category,ratings]);

  let count = filteredProductCount;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS --LIVOLT" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              getAriaLabel={() => "Temperature range"}
              valueLabelDisplay="auto"
              min={0}
              max={25000}
            />
            <Typography>Category</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Rating Above</Typography>
              <Slider 
               value = {ratings}
               onChange = {(e,newRating)=>{
                setRatings(newRating);
               }}
               aria-label="continuous-slider"
               valueLabelDisplay="auto"
               min={0}
               max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemsClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
