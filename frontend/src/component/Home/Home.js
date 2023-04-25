import React, { Fragment, useEffect } from "react";
import Product from "./ProductCard.js";
import "./Home.css";
import MetaData from "../layout/MetaData.js";
import { getProduct,clearErrors} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products} = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="HOME PAGE IS WORKING" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND THE AMAZING PRODUCT BELOW</h1>
            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
