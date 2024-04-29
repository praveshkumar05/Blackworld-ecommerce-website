// import React, { useEffect, useState } from 'react'
// import Layout from '../../components/Layout.js/Layout'
// import Adminmenu from '../../components/Layout.js/Routes/Adminmenu'
// import { toast } from 'react-hot-toast';
// import {  getCategoryfunc, getSingleProductfunc, productDeletefunc, updateProductfunc } from '../../components/Layout.js/APIS/apicall';
// import { useNavigate ,useParams } from 'react-router-dom';
// import {Select} from 'antd'
// import { BASE_URL } from '../../components/Layout.js/APIS/baseurl';
// const {Option}=Select;

// const UpdateProduct = (req,res) => {
//     const [categories,setCategories]=useState([]);
//     const [category, setCategory]=useState({});
//     const [photo,setPhoto]=useState("");
//     const params=useParams();
//     const [id,setId]=useState("");
//     const navigate=useNavigate();
//     const [inputval,setInputval]=useState({
//       name:'',
//       description:"",
//       price:0,
//       quantity:0,
//       shipping:''
//     })
//     // get ALL categories
//     const getAllcategory=async()=>{
//       try {
//           const {data}=await getCategoryfunc();
//            if(data?.success)
//            {
//                 setCategories(data?.category);
//            }
//            } catch (error) {
//             console.log(error);
//             toast.error("error during getting categries")
            
//             }
//     }
//     const setval=(e)=>{
//         const {name,value} = e.target;
        
//       setInputval({
//           ...inputval,
//           [name]:value
//       })
//     }
//     const getSingleProduct=async()=>{
        
//       try {
//         const slug=params.slug;
//       //  console.log("asd;flkjasd",slug);
//             const {data}=await getSingleProductfunc(slug);
//       // console.log(data);
//             if(data?.success)
//             {
//             //  console.log(data.product);
//                setCategory(data?.product.category);
//                setId(data?.product._id)
//               //  console.log(data.product.category);
//               //  console.log(category.name);

//                setInputval({
//                   name:data?.product.name,
//                   description:data?.product.description,
//                   price:data?.product.price,
//                   quantity:data?.product.quantity,
//                   shipping:data?.product.shipping,
                  
//                })
               
//             }
//       } catch (error) {
//         console.log(error);
//         toast.error("there is some error in gettin product"); 
//       }
//     } 
//     const handleUpdate=async()=>{
  
//       try {
//           const productData = await new FormData();
//           productData.append("name",inputval.name);
//           productData.append("description",inputval.description)
//           productData.append("price",inputval.price)
//           productData.append("quantity",inputval.quantity)
//           productData.append("shipping",inputval.shipping)
//           productData.append("category",category._id)
//           //console.log(productData);
//           photo&& productData.append("photo",photo);
//          // console.log(productData);
//           const config={
//                 "Content-Type":'multipart/form-data'
//           }
//           const {data}=await updateProductfunc(productData,config,id);
//           console.log(data);
//           if(data.success)
//           {
//               toast.success(`${data.product.name} is created`);
//               navigate('/dashboard/admin/products')
//           }
//           else{
//               toast.error( `${data.message} `)
//           }
//       } catch (error) {
//         console.log(error);
//         toast.error("there is some error in updating product") 
//       }
//     }

//     const handleDelete=async()=>{

//           try {
//                 const config={
//                   "Content-Type":'multipart/form-data'
//                  }
//                   const {res}=await  productDeletefunc(id,config);
//                  // console.log(res);
                 
//                     toast.success(`deleted`)
//                      navigate('/dashboard/admin/products');
                  
//           } catch (error) {
//             console.log(error);
//             toast.error("Ooops there is some error in deleting")
//           }
//     }
    
//     useEffect(()=>{
//       console.log("you are here on update page").
//       getSingleProduct();
//       getAllcategory();
//       //eslint-disable-next-line
//     },[])

//     return (
//       <Layout title={"Dashboard-Create-Product"}>
//           <div className='container-fluid m-3 p-3'>
//           <div className="row">
//                <div className="col-md-3">
//                   <Adminmenu/>
//                </div>
//                <div className="col-md-9">
//                <h1 className='text-center text-bg-dark'> <strong>Update Product</strong></h1>
//                   <div className="m-1 w-75">
//                         <Select
//                             placeholder="Select a Category"
//                             size='large'
//                             showSearch
//                             className='form-select mb-3'
//                             value={category.name}
//                             onChange={(value)=>setCategory(value) }>   
//                             { 
//                                 categories?.map((c)=>(
//                                 <Option key={c._id} value={c._id}>{c.name}</Option>
//                               ))
//                             }
//                          </Select>
//                          <div className="mb-3">
//                               <label className='btn btn-outline-secondary col-md-12'>
//                                { photo?photo.name:'upload photo'}
//                                 <input type='file' accept='image/*'  onChange={(e)=>(setPhoto(e.target.files[0]))} hidden></input>
//                               </label>
//                          </div>
//                          <div className="mb-3 align-items-center">
//                           {
//                             photo?(
//                               <div>
//                                 <img 
//                                    src={URL.createObjectURL(photo)}
//                                    alt='Product-chehra'
//                                    className='img img-responsive'  
//                                    height={"200px"}
//                                    width={"18rem"}
//                                 />
//                               </div>
//                             ):(
//                               <div className="text-cneter">
//                                 <img 
//                                    src={`${BASE_URL}/product/productPhoto/${id}`}
//                                    alt='Product-chehra'
//                                    className='img img-responsive'  
//                                    height={"500px"}
//                                    width={"400px"}
//                                 />
//                               </div>
//                             )
//                           }
//                          </div>
//                          <div className='mb-3'>
//                             <input 
//                             type='text'
//                             name='name'
//                             placeholder='enter prdouct Name'
//                             value={inputval.name}
//                             onChange={setval}
//                             className='form-control'
//                              />
//                          </div>
//                          <div className='mb-3'>
//                             <input 
//                             type='text'
//                             name='description'
//                             placeholder='Write Description of Product'
//                             value={inputval.description}
//                             onChange={setval}
//                             className='form-control'
                            
//                              />
//                          </div>
//                          <div className='mb-3'>
//                             <input 
//                             type='number'
//                             name='price'
//                             placeholder='Enter The Price'
//                             value={inputval.price}
//                             onChange={setval}
//                             className='form-control'
//                              />
//                          </div>
//                          <div className='mb-3'>
//                             <input 
//                             type='number'
//                             name='quantity'
//                             placeholder='quantity of product'
//                             value={inputval.quantity}
//                             onChange={setval}
//                             className='form-control'
//                              />
//                          </div>
//                          <div className='mb-3'>
//                             <Select
                             
//                               size='large'
//                               name='shipping'
//                               placeholder='select Shipping'
//                               className='form-select mb-3'
//                               showSearch
//                               onChange={(value)=>setInputval(...inputval,inputval.shipping=value)}
//                               value= { inputval.shipping ? "YES" : "NO"}
//                             >
//                               <Option value="0">No</Option>
//                               <Option value="1">YES</Option>
//                             </Select>
//                          </div>
//                          <div className='d-flex'>
//                          <div className='mb-3'>
//                           <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PRODUCT</button>
//                          </div>
//                          <div style={{marginLeft:'5px'}}>
//                           <button className='btn btn-danger' onClick={handleDelete}>DELETE PRODUCT</button>
//                          </div>
//                          </div>
//                   </div>
//                </div>
  
//             </div>
//           </div> 
           
//       </Layout>
//     )
//   }
  

// export default UpdateProduct


import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout.js/Layout'
import Adminmenu from '../../components/Layout.js/Routes/Adminmenu'
import { toast } from 'react-hot-toast';
import {  getCategoryfunc, getSingleProductfunc, productDeletefunc, updateProductfunc } from '../../components/Layout.js/APIS/apicall';
import { useNavigate ,useParams } from 'react-router-dom';
import {Select} from 'antd'
// import { BASE_URL } from '../../components/Layout.js/APIS/baseurl';
const {Option}=Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [photo, setPhoto] = useState("");
  const params = useParams();
  const [productId,setProductId] = useState("null");
  console.log(params);
  const navigate = useNavigate();
  const [inputval, setInputval] = useState({
    name: '',
    description: "",
    price: 0,
    quantity: 0,
    shipping: ''
  });

  // Get all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategoryfunc();
        if (data?.success) {
          setCategories(data.category);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching categories");
      }
    };

    const fetchProduct = async () => {
      try {
        const { data } = await getSingleProductfunc(params?.slug);
        if (data?.success) {
          
          const { product } = data;
          setProductId(product?._id);
          setCategory(product.category);
          setInputval({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            shipping: product.shipping,
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching product details");
      }
    };

    fetchCategories();
    fetchProduct();
  }, [params.slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputval(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setCategory(categories.find(c => c._id === value));
  };


  const handleUpdate = async () => {
    try {
      const productData = new FormData();
      Object.entries(inputval).forEach(([key, value]) => {
        productData.append(key, value);
      });
      if (category) {
        productData.append("category", category?._id);
      }
      if (photo) {
        productData.append("photo", photo);
      }

      const { data } = await updateProductfunc(productData, { "Content-Type": 'multipart/form-data' }, category?._id);
      if (data?.success) {
        toast.success(`${data?.product.name} has been updated`);
        navigate('/dashboard/admin/products');
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating product");
    }
  };

  const handleDelete = async () => {
    try {
      await productDeletefunc(productId, { "Content-Type": 'multipart/form-data' });
      toast.success("Product deleted");
      navigate('/dashboard/admin/products');
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product");
    }
  };

  return (
    <Layout title="Dashboard - Update Product">
      <div className='container-fluid m-3 p-3'>
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1 className='text-center text-bg-dark'> <strong>Update Product</strong></h1>
            <div className="m-1 w-75">
              <Select
                placeholder="Select a Category"
                size='large'
                showSearch
                className='form-select mb-3'
                value={category ? category.name : "Select a Category"}
                onChange={handleCategoryChange}>
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name : 'Upload photo'}
                  <input type='file' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                </label>
              </div>
              <div className='mb-3'>
                <input
                  type='text'
                  name='name'
                  placeholder='Enter product name'
                  value={inputval.name}
                  onChange={handleInputChange}
                  className='form-control'
                />
              </div>
              <div className='mb-3'>
                <input
                  type='text'
                  name='description'
                  placeholder='Write description of product'
                  value={inputval.description}
                  onChange={handleInputChange}
                  className='form-control'
                />
              </div>
              <div className='mb-3'>
                <input
                  type='number'
                  name='price'
                  placeholder='Enter the price'
                  value={inputval.price}
                  onChange={handleInputChange}
                  className='form-control'
                />
              </div>
              <div className='mb-3'>
                <input
                  type='number'
                  name='quantity'
                  placeholder='Quantity of product'
                  value={inputval.quantity}
                  onChange={handleInputChange}
                  className='form-control'
                />
              </div>
              <div className='mb-3'>
                <Select
                  size='large'
                  name='shipping'
                  placeholder='Select shipping'
                  className='form-select mb-3'
                  showSearch
                  onChange={(value) => setInputval({ ...inputval, shipping: value })}
                  value={inputval.shipping ? "YES" : "NO"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className='d-flex'>
                <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                <button className='btn btn-danger' onClick={handleDelete} style={{ marginLeft: '5px' }}>Delete Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
