import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout.js/Layout";
import { toast } from "react-hot-toast";
import {
  getCategoryfunc,
  getListPerPagefunc,
  getTotalcountfunc,
  getfilteredProduct,
} from "../components/Layout.js/APIS/apicall";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../components/Layout.js/context/cart";
import "./home.css";
import { BASE_URL } from "../components/Layout.js/APIS/baseurl";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useContext(cartContext);

  // get total count of product

  const getTotalcount = async () => {
    try {
      const { data } = await getTotalcountfunc();
      if (data.success) {
        setTotal(data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get list of product according to page
  const Loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await getListPerPagefunc(page);
      setLoading(false);
      if (data.success) {
        setLoading(false);
        setProduct([...product, ...data?.products]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // get ALL product
  const getAllproduct = async () => {
    try {
      setLoading(true);
      const { data } = await getListPerPagefunc(page);
      setLoading(false);
      if (data.success) {
        setProduct(data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Oops ! there is some error in getting product");
    }
  };
  const getAllcategory = async () => {
    try {
      const { data } = await getCategoryfunc();
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops ! there is some error in getting catergories");
    }
  };
  // filter by category
  const handleCategory = async (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
    } catch (error) {
      console.log(error);
      toast.success("there is some error in getiting");
    }
  };

  const handleFilter = async () => {
    try {
      const Data = {
        checked: checked,
        radio: radio,
      };
      const { data } = await getfilteredProduct(Data);
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllcategory();
    getTotalcount();
  }, []);
  useEffect(() => {
    if (checked.length || radio.length) handleFilter();
    //eslint-disable-next-line
  }, [checked, radio]);
  useEffect(() => {
    if (!checked.length && !radio.length) getAllproduct();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (page === 1) return;
    Loadmore();
    //eslint-disable-next-line
  }, [page]);

  return (
    <Layout title={"ALL-BLACK-PRODUCT"}>
      <div className=" container-fluid  ">
        <div className="row ">
            <img
              src="https://img.freepik.com/free-vector/isometric-young-people-using-technological-devices-background_23-2148126644.jpg?w=740&t=st=1684749206~exp=1684749806~hmac=d606e0633e6acc541d86961cda705c460e5c9112f39fc3b730b0352fef969f51"
              className="banner-img"
              alt="bannerimage"
              width={"100%"}
            />
          
        </div>
        <div className=" row    bg-black home-page">
          <div className="col-md-4 filters">
            <h4 className="text-center">
              {" "}
              <span style={{ color: "whitesmoke" }}>
                <strong>Filter By Category</strong>
              </span>{" "}
            </h4>
            <div className="d-flex flex-column m-3">
              {categories.map((c) => (
                <div className="m-sm-1">
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleCategory(e.target.checked, c._id)}
                  >
                    <span style={{ color: "white" }}>
                      {" "}
                      <strong>{c.name}</strong>
                    </span>
                  </Checkbox>
                </div>
              ))}
            </div>
            <h4 className="text-center">
              <span style={{ color: "whitesmoke" }}>
                <strong>Filter By Price</strong>
              </span>
            </h4>
            <div className="d-flex flex-column m-3">
              {
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices.map((price) => (
                    <div className="m-sm-1">
                      <Radio key={price._id} value={price.array}>
                        <span style={{ color: "white" }}>
                          {" "}
                          <strong>{price.name}</strong>
                        </span>
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              }
            </div>

            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
                style={{ width: "25rem", margin: "8px", alignItems: "center" }}
              >
                Reset Filter
              </button>
            </div>
          </div>
          <div className="col-md-8  content">
            <div className="d-flex flex-wrap">
              {product.map((p) => (
                <>
                  <div
                    className="card m-3"
                    style={{
                      width: "25rem",
                      margin: "8px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      className="card-img-top"
                      height={"400px"}
                      src={`${BASE_URL}/product/productPhoto/${p._id}`}
                      alt="Card  cap"
                    />
                    <div className="card-body">
                      <div className="card-name-price d-flex justify-content-between">
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>
                      <p className="card-text">
                        {p.description.substring(0, 30)}
                      </p>
                      <div className="card-name-price">
                        <button
                          class="btn btn-primary ms-2"
                          onClick={() => {
                            setCartItem([...cartItem, p]);
                            localStorage.setItem(
                              "cartItem",
                              JSON.stringify(cartItem)
                            );
                            toast.success(`${p.name} is added To Cart`);
                          }}
                        >
                          Add To Cart
                        </button>
                        <button
                          class="btn btn-secondary ms-2"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="m-2 p-3 ">
              {product && product.length < total && (
                <button
                  className="btn loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  <h3>{loading ? "Loading..." : "Loadmore"}</h3>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
