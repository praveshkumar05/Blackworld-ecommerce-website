import React from 'react'
import Layout from '../../components/Layout.js/Layout'
import Adminmenu from '../../components/Layout.js/Routes/Adminmenu'


const Users = () => {
  return (
    <Layout title={"Dashboard -ALL USERS"}>
    <div className='container-fluid m-3 p-3'>
    <div className="row">
         <div className="col-md-3">
            <Adminmenu/>
         </div>
         <div className="col-md-9">
            all users
         </div>
      </div>
    </div> 
     
</Layout>
  )
}

export default Users
