
import React from "react";
import { NavLink } from "react-router-dom";
const Adminmenu = () => {
  return (
    <div className="text-center container " >
        <div className="list-group ">
           <li > 
            <NavLink to="/dashboard/admin" activeClassName="active" className="nav-link ">
                       <h3><strong >Admin Panel</strong></h3>
                  </NavLink>
           </li>
          <l1 > <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action ">
          <h5 ><strong >Create Category</strong></h5>
               </NavLink>
          </l1>
         
          <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action  ">
          <h5 ><strong >Create Product</strong></h5>
          </NavLink>
          <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action ">
          <h5 ><strong >Product</strong></h5>
          </NavLink>
          <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action ">
          <h5 ><strong >Orderes</strong></h5>
          </NavLink>
          <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action ">
          <h5 ><strong >Users</strong></h5>
          </NavLink>
        </div>
    </div>
  );
};

export default Adminmenu;
