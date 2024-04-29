// import React, { useEffect, useState } from "react";

// import { toast } from "react-hot-toast";
// import { getCategoryfunc} from "../../components/Layout.js/APIS/apicall";
// const CaregoryForm = ({handlesubmit ,value,setValue}) => {

//   const [category, setCategory] = useState([]);
//   const getAllCategory = async () => {
//     try {
//       const res = await getCategoryfunc();
//       console.log(res.data);
//       if (res.data.success) {
//         setCategory(res.data.category);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("There is Some error in category Loading");
//     }
//   };
//   useEffect(() => {
//     getAllCategory();
//   }, []);
//   return (
//     <>
//       <form onSubmit={handlesubmit}>
//       <div style={{  alignItems:'center', display:'flex',justifyContent:'center' }}>
//         <div className="form-group d-flex">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter new Category "
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//             style={{ margin:"5px" }}
//           />
//         </div>
//         <div >
//                 <button type="submit" className="btn btn-primary">
//                      Submit
//                 </button>
//         </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default CaregoryForm;


import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getCategoryfunc } from "../../components/Layout.js/APIS/apicall";

const CategoryForm = ({ handleSubmit, value, setValue, parent, setParent }) => {
  const [categories, setCategories] = useState([]);

  const getAllCategory = async () => {
    try {
      const res = await getCategoryfunc();

      if (res?.data.success) {
        console.log(res.data);
        setCategories(res?.data?.category);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
      toast.error("There is some error in category loading");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <div className="form-group d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Enter new category name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ margin: "5px" }}
            />
            {/* Dropdown for selecting parent category */}
            <select
              className="form-control"
              value={parent}
              onChange={(e) => setParent(e.target.value)}
              style={{ margin: "5px" }}
            >
              <option value="">Select Parent Category (optional)</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;

