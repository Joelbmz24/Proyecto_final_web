import { useState, useEffect } from "react";
import services from "../../Services/user.services";
import Menu from "../../Components/PrivateRoute/Menu/Menu";
import Feed from "../../Components/PrivateRoute/Feed/Feed";
import {getPosts} from "../../Services/Functions";


export default function Favorites() {

  	const [posts, getPost] = useState([]);

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
		          		console.log("Este post se encuentra desactivado!");
		        	}else{return response;}
		        	
		    	} catch(error) {
		        console.error(error);
	      		}
	        });


	        const results = await Promise.all(respondeMapped);
	        const resultsFiltered = results.filter(post => post !== undefined);
	        const finalMap = resultsFiltered.map(getPosts);

	        console.log(finalMap);
	        localStorage.setItem("postsFavs", JSON.stringify(finalMap));
	        getPost(finalMap);
	       
	      } catch(error) {
	        console.error(error);
	      }
	    };

	    getFavoritePosts();
	},[] )


	return (
		<div className="flex gap-4 flex-col w-full justify-center items-center  min-h-screen bg-gray-100">
			<Menu className="w-full"/>
      <div className="w-3/5 md:w-2/3 lg:w-2/3 h-full flex flex-col justify-center items-center lg:min-h-screen">
        <Feed posts={posts} className="w-full"/>
        <div className="flex flex-row">
      </div>
		</div>
	</div>
	);
}