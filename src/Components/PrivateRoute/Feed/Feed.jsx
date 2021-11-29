import { useState, useEffect } from "react";
import PostContainer from "../PostContainer/PostContainer";
import services from "../../../Services/user.services";

const Feed = ({posts = [],pageNumber=0}) => {
	const token = localStorage.getItem("token");

	const [whoLiked, setWhoLiked] = useState(); 
		
		const getWhoLiked = async () => {
			const  whoami  = await services.verifyToken(token);
			setWhoLiked(whoami.username);
			
		}
	
 		getWhoLiked();


		
	return (
		<div className="w-screen flex flex-col items-center justify-center lg:w-5/6 md:w-5/6">
			 {
			 posts.map(post =>
			 <div><PostContainer postNumber={pageNumber} username={whoLiked} key={post.id} post={post} /></div>)
			 }
		
		</div>
	);
};

export default Feed;
