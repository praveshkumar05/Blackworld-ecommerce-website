import React, { useState } from "react";
import Layout from "../../components/Layout.js/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 import "./register.css"
import { registerfunc } from "../../components/Layout.js/APIS/apicall";
import { useNavigate } from "react-router-dom";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
const Register = () => {
  const [show, setShow] = useState(false);
  const [inputVal, setinputVal] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const setvalue = async (e) => {
    const { name, value } = e.target;
    setinputVal(() => {
      return { ...inputVal, [name]: value };
    });
  };
  const submitData = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, address } = inputVal;
    if (name === "" || email === " " || password === "" || phone === "" || address === " ") {
      toast.error("Please Fill All the Required Field");
    }
    else if (phone.length < 10 || phone.length > 10) {
      toast.error("please enter 10 digit phone number")

    }

    else {
      const Data = { name, email, password, phone, address };
      const config = {
        "Content-Type": "application/json",
      };
      const { data } = await registerfunc(Data, config);

      if (data.status === 201) {
        toast.success("You are successfully registered");
        navigate("/login")
      } else {
        alert(data.message);
      }
    }
  };
  return (
    <>
      <Layout>
        <ToastContainer />
        <div className="container-fluid form-container   " style={{height:"100vh"}} >
          <div className="row  ">
            
            <div className="col-md-4 ">
                      
            </div>
            <div className="col-md-4 mt-5 form  ">
              <form className=" m-2">
                <h2 className="title text-center" style={{color:"darksalmon"}}><strong > Register Here</strong></h2>
                <div className="mb-3  form-group">
                  <input
                    type="text"
                    onChange={setvalue}
                    name="name"
                    className="form-control"
                    required
                    id="fullname"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3 form-group">

                  <input
                    type="email"
                    onChange={setvalue}
                    name="email"
                    className="form-control"
                    required
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email"
                  />
                </div>

                <div className="mb-1  form-group form-inline ">
                 <div className="d-flex">
                 <input
                    type={show ? "text" : "password"}
                    onChange={setvalue}
                    name="password"
                    className="form-control"
                    required
                    id="exampleInputPassword1"
                    placeholder="password"
                  />
                  
                  <span
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "8px",
                      marginLeft: "8px",
                      padding: "6px",
                    }}
                  >
                    {show ? (
                      <VisibilityTwoToneIcon onClick={() => setShow(false)} />
                    ) : (
                      <VisibilityOffTwoToneIcon onClick={() => setShow(true)} />
                    )}
                  </span>
                 </div>
                 <small className="form-text text-muted  " >
                     <p style={{color:"whitesmoke"}}> password length should be 6-20</p> 
                </small>
                </div>
               
                <div className="mb-3  form-group">
                  <input
                    type="text"
                    onChange={setvalue}
                    name="phone"
                    className="form-control"
                    required
                    id="Phone"
                    placeholder="Enter Your Phone Number"
                  />
                </div>
                <div className="mb-3  form-group">

                  <input
                    type="text"
                    onChange={setvalue}
                    name="address"
                    className="form-control form-control-lg"
                    required
                    id="add"
                    placeholder="Enter Your Address"
                  />
                </div>

                <div className="mb-3 p-3 row justify-content-center form-group">
                  
                      <button
                        type="submit"
                        className="btn btn-primary bg-secondary"
                        onClick={submitData}
                      >
                        REGISTER
                      </button>
                  
                </div>


              </form>
            </div>
            <div className="col-md-4">

            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
