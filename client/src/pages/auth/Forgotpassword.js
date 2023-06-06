import React, { useState } from "react";
import Layout from "../../components/Layout.js/Layout";
import  {toast} from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
import { updatepasswordfunc } from "../../components/Layout.js/APIS/apicall";
import { useNavigate,useParams} from "react-router-dom";


const Forgotpassword = () => {
  const [inputVal, setinputVal] = useState({
    password: "",
  });
  const {id,token}=useParams();
  const navigate = useNavigate();
  const setvalue = async (e) => {
    const { name, value } = e.target;
    setinputVal(() => {
      return { ...inputVal, [name]: value };
    });
  };
  const submitData = async (e) => {
    e.preventDefault();
    const {  password } = inputVal;
    if ( password === "") {
      toast.error("Please Fill All the Required Field");
    } else {
      const data = { password,id,token };
      const config = {
        "Content-Type": "application/json",
      };
      const result = await updatepasswordfunc(data, config);
      //console.log(result);
      if (result.status === 201) {
        toast.success("You Password is updated successfully");
        navigate("/login");
      } else {
        toast.error("There is some error try again please");
      }
    }
  };
  return (
    <>
      <Layout>
        <div className="form-container">
          <form>
            <h4 className="title">Enter Your New Password</h4>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                onChange={setvalue}
                name="password"
                className="form-control"
                required
                id="exampleInputPassword1"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitData}
            >
              SET PASSWORD
            </button>
           
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Forgotpassword;
