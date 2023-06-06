import React from 'react'
import Adminmenu from '../../components/Layout.js/Routes/Adminmenu'
import Layout from "../../components/Layout.js/Layout.js";
import { useAuth } from '../../components/Layout.js/context/auth';
const Admindashboard = () => {
  const [auth]=useAuth();
  return (
    
    <Layout>
     
          <div className="container-fluid ">
            <div className="row justify-content-around" style={{minHeight:"100vh"}}>
                  <div className="col-md-3 p-5 bg-secondary">
                      <Adminmenu/>
                  </div>
                  <div className="col-md-9 bg-dark " style={{display:'center' }}>
                        <div className="card w-60  p-5  bg-dark " >
                           <h3> <strong style={{color:'whitesmoke'}}>Name::-{auth?.user?.name}</strong></h3>
                           <span> <strong  style={{color:'whitesmoke'}}>Email::-{auth?.user?.email}</strong></span>
                           <h3><strong  style={{color:'whitesmoke'}}>Moblile::{auth?.user?.phone}</strong></h3>
                           <h3> <strong  style={{color:'whitesmoke'}}>address::{auth?.user?.address}</strong></h3>
                        </div>
                  </div>   
            </div>
          </div>
        
         
    </Layout>
  )
}

export default Admindashboard
