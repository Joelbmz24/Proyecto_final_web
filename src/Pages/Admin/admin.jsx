import { useState, useEffect } from "react";
import { useUserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import admin from "../../Assets/Img/admin.png"
import services from "../../Services/user.services";
import Feed from "../../Components/PrivateRoute/Feed/Feed"
import Button from "../../Components/PrivateRoute/Button/Button"
import { getPosts } from "../../Services/Functions";
import Menu from "../../Components/PrivateRoute/Menu/Menu"

export default function Admin() {


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

  const GetAllPost = () => {
    changeNumber(0);
}

     
  const onNextButton = () => {
      pageNumber < pagePost ? changeNumber(pageNumber + 1) : console.log("Valor maximo");};

  const onPrevButton = () => {
     pageNumber >= 0 ? changeNumber(pageNumber - 1) : console.log("Valor minimo");  
  };


  return (
    <section className="flex gap-4 flex-col w-full justify-center items-center  min-h-screen bg-gray-100">
      <Menu className="w-full"/>
      <div className="w-4/5 md:w-2/3 lg:w-2/3 gap-6 h-full flex flex-col justify-center items-center lg:min-h-screen">
        <Feed posts={posts} pageNumber={pageNumber} className=""/>

        <div className="flex flex-row">
        <Button title ="Previous" onButton = {() => {onPrevButton();}}/>
        <Button title ="Next" onButton = {() => {onNextButton();}}/> 
        </div>
      </div>
    </section>
  );
}