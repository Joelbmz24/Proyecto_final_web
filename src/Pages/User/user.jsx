import { useState, useEffect } from "react";
import services from "../../Services/user.services";
import Button from "../../Components/PrivateRoute/Button/Button"
import Menu from "../../Components/PrivateRoute/Menu/Menu"
import Feed from "../../Components/PrivateRoute/Feed/Feed"

export default function User() {

  const [posts, getPost] = useState([]);
  const [pageNumber, changeNumber] = useState(0);
  const pagePost = localStorage.getItem("pages");

 useEffect(() => {
    const getPosts = async () => {
      try {
        const filters = {page: pageNumber};

        const response = await services.getAll(filters);

        if (!response) {
          throw new Error("Something was wrong");
        }

        getPost(response);
      } catch (error) {
        console.error(error);
      }
    };

      getPosts();
    
  }, [pageNumber]);

     
   const onNextButton = () => {
      pageNumber < (pagePost - 2) ? changeNumber(pageNumber + 1) : console.log("Valor maximo");
       window.scrollTo({
      top: 0,
      behavior: "smooth"
      });
    };


  const onPrevButton = () => {
     pageNumber >= 0 ? changeNumber(pageNumber - 1) : console.log("Valor minimo"); 
     window.scrollTo({
      top: 0,
      behavior: "smooth"
      });      
  };


  return (
   <section className="flex gap-4 flex-col w-full justify-center items-center  min-h-screen bg-gray-100">
      <Menu className="w-full"/>
      <div className="w-4/5 md:w-2/3 lg:w-2/3 gap-6 h-full flex flex-col justify-center items-center lg:min-h-screen">
        <Feed posts={posts} className="w-full"/>
        <div className="flex flex-row w-1/2 justify-between mb-2">
        <Button title ="Previous" className="p-2 m-2" onButton = {() => {onPrevButton();}}/>
        <Button title ="Next" onButton = {() => {onNextButton();}}/> 
        </div>
      </div>
    </section>
  );
}