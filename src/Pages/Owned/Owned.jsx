import { useState, useEffect } from "react";
import services from "../../Services/user.services";
import Menu from "../../Components/PrivateRoute/Menu/Menu";
import Feed from "../../Components/PrivateRoute/Feed/Feed";


export default function Owned() {
  	const [own, setOwn] = useState(false);
  	const [pageNumber, changeNumber] = useState(0);
	const pagePost = localStorage.getItem("pages");
  	const [posts, getPost] = useState([]);

  	useEffect(() => {
    const getMyPosts = async () => {
      try {
        const filters = {page: pageNumber};

        const response = await services.getOwn(filters);

        if (!response) {
          throw new Error("Something was wrong");
        }
        console.log(response);
        getPost(response);
      } catch (error) {
        console.error(error);
      }
    };

     getMyPosts();
 
    
  }, [pageNumber, own]);

  	const onNextButton = () => {
      pageNumber < pagePost ? changeNumber(pageNumber + 1) : console.log("Valor maximo");  
  };

  const onPrevButton = () => {
     pageNumber >= 0 ? changeNumber(pageNumber - 1) : console.log("Valor minimo");  
  };

	return (
		<div className="flex gap-4 flex-col w-full justify-center items-center  min-h-screen bg-gray-100">
			<Menu className="w-full"/>
      <div className="w-3/5 md:w-2/3 lg:w-2/3 gap-6 h-full flex flex-col justify-center items-center lg:min-h-screen">

        <Feed posts={posts} className="w-full"/>
        <div className="flex flex-row">
        <button onClick={onNextButton}>
        Siguiente
        </button>
        <button onClick={onPrevButton}>
        Anterior
        </button>
        </div>
      </div>
		</div>
	);
}