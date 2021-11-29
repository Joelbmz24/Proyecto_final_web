import React from "react";
import {useRef,useState} from "react";
import services from "../../../Services/user.services";

const AddComment = ({id,isSubmit}) => {
const [inputValue,setInputValue] = useState("");

function onChange(e){
    setInputValue(e.target.value);
}

  async function onSubmit(e) {
        e.preventDefault();
        
        const body = inputValue;
        const res = await services.getComments(id,body);

        console.log(res);

      setInputValue("");
      isSubmit(body);
    }

    return (
       <form onSubmit={onSubmit} className="flex flex-row">
           <input value={inputValue} onChange={onChange} type="text" className="font-medium h-1/2 text-gray-900 focus:outline-none p-2 rounded-lg bg-pink-200 focus:ring text-center ring-pink-200 w-3/4 p-2 m-2 md:p-1 md:m-1"/>
           <button>Comentar</button>
       </form>
    );
};
export default AddComment;
