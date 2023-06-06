import React,{ useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchContext } from '../Layout.js/context/Search';
import { searchinputFunc } from '../Layout.js/APIS/apicall';

const SearchInput = () => {
    const [value,setValue]=useContext(searchContext);
    const navigate=useNavigate();
    const handleSumbit=async(e)=>{
            e.preventDefault();
            try {
                const {data}=await searchinputFunc(value.keyword);
                setValue({...value,results:data.result});
                console.log(data);
                navigate("/search");
            } catch (error) {
                    console.log(error);
            }

    }
    return (
        
        <div>
            <form className="d-flex" role="search" onSubmit={handleSumbit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                    value={value.keyword}
                    onChange={(e)=>{setValue({...value,keyword:e.target.value})}}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchInput
