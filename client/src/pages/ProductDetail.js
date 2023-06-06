import React, { useEffect, useState, useContext } from 'react'
import Layout from '../components/Layout.js/Layout'
import { useParams, useNavigate } from 'react-router-dom'
import { getSingleProductfunc, getsimilarProductfunc } from '../components/Layout.js/APIS/apicall';
import { BASE_URL } from '../components/Layout.js/APIS/baseurl';
import "./Productdetail.css"
import { cartContext } from "../components/Layout.js/context/cart";
import { toast } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
const ProductDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    // console.log(params.slug);
    const [product, setProduct] = useState({});
    const [cartItem, setCartItem] = useContext(cartContext);
    const [relatedProduct, setRelatedProduct] = useState([]);
    const getProduct = async () => {
        try {
            const { data } = await getSingleProductfunc(params.slug);
            console.log(data);
            if (data?.success) {
                setProduct(data.product);
                getSimilarProduct(data?.product?._id, data?.product?.category?._id);

            }

        } catch (error) {
            console.log(error);
        }
    }
    const getSimilarProduct = async (pid, cid) => {
        try {
            // const cid=product?.category?._id;
            // const pid=product?._id;
            const Data = { cid: cid, pid: pid };
            const { data } = await getsimilarProductfunc(Data);
            if (data?.success) {
                setRelatedProduct(data.products);
            }

        } catch (error) {

            console.log(error);
        }
    }
    useEffect(() => {
        if (params?.slug) getProduct();
        //eslint-disable-next-line
    }, [params?.slug])
    return (
        <Layout>

            {/* {JSON.stringify(product,null,4)} */}
            <ToastContainer />
            <div className='row container product-details'>
                <div className="col-md-6">
                    <img style={{ marginLeft: "10px" }} width={"350px"} height={"300px"} src={`${BASE_URL}/product/productPhoto/${product._id}`} alt="AlterNate Products" />

                    <div className="col-md-6 product-details-info">
                        <h1 className='text-center'> <strong>Product Details</strong></h1>
                        <hr />
                        <h5>Name--:{product?.name}</h5>
                        <h5>Description---:{product?.description}</h5>
                        <h5>
                            Price : {product?.price?.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}</h5>
                        <h5>category:{product.category?.name} </h5>
                        <h5>quantity:{product?.quantity} </h5>
                        <button className='btn btn-secondary ' onClick={() => {
                            setCartItem([...cartItem, product]);
                            localStorage.setItem("cartItem", JSON.stringify(cartItem));
                            toast.success(`${product.name} is added To Cart`);
                        }}>ADD TO CART</button>
                    </div>
                </div>
                <hr />
                <div className="row container similar-products mt-5">
                    <h3>Similar Products</h3>
                    {relatedProduct.length < 1 ? <p className='text-center'>NO SIMILAR PRODUCT FOUND</p> : ""}
                    <div className='d-flex flex-wrap'>
                        {
                            relatedProduct.map((p) => (
                                <>
                                    <div className="card m-2" >
                                        <img className="card-img-top" src={`${BASE_URL}/product/productPhoto/${p._id}`} alt="Card  cap" />
                                        <div className="card-body">
                                            <div className="card-name-price">
                                                <h5 className="card-title">{p.name}</h5>
                                                <h5 className="card-title card-price">
                                                    {p.price.toLocaleString("en-US", {
                                                        style: "currency",
                                                        currency: "USD",
                                                    })}
                                                </h5>
                                            </div>
                                            <p className="card-text ">
                                                {p.description.substring(0, 60)}...
                                            </p>
                                            <div className="card-name-price">
                                                <button class="btn btn-primary ms-2" onClick={() => {
                                                    setCartItem([...cartItem, p]);
                                                    localStorage.setItem("cartItem", JSON.stringify(cartItem));
                                                    toast.success(`${p.name} is added To Cart`);
                                                }} >Add To Cart</button>
                                            </div>
                                            <button class="btn btn-secondary ms-2" onClick={() => (navigate(`/product/${p.slug}`))}>More Details</button>

                                        </div>
                                    </div>
                                </>
                            ))
                        }

                    </div>
                </div>

            </div>



        </Layout>
    )
}

export default ProductDetail
