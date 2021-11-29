import { useState, useEffect } from "react";
import services from "../../Services/user.services";
import Menu from "../../Components/PrivateRoute/Menu/Menu";
import Feed from "../../Components/PrivateRoute/Feed/Feed";
import {getPosts} from "../../Services/Functions";


export default function Favorites() {

	const [fav, setFav] = useState(false);
  	const [posts, getPost] = useState([]);
  	const [pageNumber, changeNumber] = useState(0);
	const pagePost = localStorage.getItem("pages");



	useEffect(() => {
			const getFavoritePosts = async () => {
	      try {
	        const response = await services.getAllFavorites();
	    

	        if (!response) {
	          throw new Error("Something was wrong");
	        }

	        console.log(response);
	        const respondeMapped = response.map(async (id) => {
		        try{ 		
			    	const response = await services.getOne(id);

			    	if (!response) {
		          		console.log("Este post se encuentra desactivado");
		        	}else{return response;}
		        	
		    	} catch(error) {
		        console.error(error);
	      		}
	        });


	        const results = await Promise.all(respondeMapped);
	        const resultsFiltered = results.filter(post => post !== undefined);
	        const finalMap = resultsFiltered.map(getPosts);

	        console.log(finalMap);
	        getPost(finalMap);
	       
	      } catch(error) {
	        console.error(error);
	      }
	    };

	    getFavoritePosts();
	},[fav] )

	const onNextButton = () => {
      pageNumber < pagePost ? changeNumber(pageNumber + 1) : console.log("Valor maximo");  
  };

  const onPrevButton = () => {
     pageNumber >= 0 ? changeNumber(pageNumber - 1) : console.log("Valor minimo");  
  };

	return (
		<div className="flex gap-4 flex-col w-full justify-center items-center  min-h-screen bg-gray-100">
			<Menu className="w-full"/>
      <div className="w-3/5 md:w-2/3 lg:w-2/3 h-full flex flex-col justify-center items-center lg:min-h-screen">
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