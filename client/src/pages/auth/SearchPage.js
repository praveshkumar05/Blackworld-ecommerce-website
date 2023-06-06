import React ,{useContext} from 'react'
import { searchContext } from '../../components/Layout.js/context/Search'
import Layout from '../../components/Layout.js/Layout';

import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../components/Layout.js/APIS/baseurl';
const SearchPage = () => {
  const [value]=useContext(searchContext);
  const navigate=useNavigate();

  return (
    <Layout title={"Search-Result"}>
    <div className='container'>
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {
              value?.results.length<1?"No proudct Found":`Found ${value?.results.length}`
            }
          </h6>
                 <div className='d-flex flex-text-wrap '>
                  {
                    value.results.map((p)=> 
                      <>
                          <div className="card m-2" style={{width: '22rem',margin:'8px'}}>
                            <img className="card-img-top"  width={"50px"} height={"200px"} src={`${BASE_URL}/product/productPhoto/${p._id}`} alt="Card  cap" />
                            <div className="card-body">
                              <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0,30)}</p>
                                <p className="card-text">$ {p.price}</p>
                                <button  class="btn btn-primary ms-2">Add To Cart</button>
                                <button  class="btn btn-secondary ms-2" onClick={()=>(navigate(`product/${p.slug}`))}>More Details</button>
                            </div>
                          </div>
                      </>
                   
                    )
                  }
                  </div>
            </div>
        </div>
    </Layout>
  )
}

export default SearchPage

