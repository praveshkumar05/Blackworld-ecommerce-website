import React, { useState } from "react";
import Layout from "../../components/Layout.js/Layout";
import  { toast} from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
import { resetpasswordfunc } from "../../components/Layout.js/APIS/apicall";

const Resetpassword = () => {
  const [inputVal, setinputVal] = useState({
    email: "",
    password: "",
  });
  const [okay, setOkay]=useState(false);
  const setvalue = async (e) => {
    const { name, value } = e.target;
    setinputVal(() => {
      return { ...inputVal, [name]: value };
    });
  };
  const submitData = async (e) => {
    e.preventDefault();
    const { email } = inputVal;
    if (email === " ") {
      toast.error("Please Fill All the Required Field");
    } else {
      const data = { email };
      const config = {
        "Content-Type": "application/json",
      };
      const result = await resetpasswordfunc(data, config);
      if (result.status === 201) {
            setOkay(true);
      } else {
        toast.error("Your email Id is not registered");
      }
    }
  };
  return (
    <>
      <Layout>
        <div className="form-container">
          <form>

                 { okay?<> <p  style={{ color:"green",fontWeight:"bold"}}> password reset link is sent to your email</p></>:  ""}
            <h4 className="title">Enter Your Regiseted Email</h4>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                onChange={setvalue}
                name="email"
                className="form-control"
                required
                id="exampleInputEmail1"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitData}
            >
              SEND LINK
            </button>

          </form>
        </div>
      </Layout>
    </>
  );
};

export default Resetpassword