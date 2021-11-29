import { useState, useEffect } from "react";
import shortid from "shortid";
import services from "../../../Services/user.services";
import Comment from "../Comment/Comment";
import AddComment from "../Comment/AddComment";
import {BsStarFill, BsHeartFill, BsFillChatLeftTextFill} from "react-icons/bs";
import userImage from "../../../Assets/Img/user.png"
const PostContainer = ( { pageNumber, username, post}) => {	
	const { _id , title , description , image , user , likes , comments, updated} = post;
	const getRole = localStorage.getItem("role_name");
	const dateCreated = updated.substring(0,10);
	const [isLiked, setIsLiked] = useState(likes.some(like => like.username === username));
	const [isFavorite, setFavorite] = useState(false);
	const [likeCount, setLikeCount] = useState(likes.length);
	const [commentCount, setCommentCount] = useState(comments);
	const [showComment, setShowComment] = useState(false);

	const[active, setActive] = useState(false);
	const [modify, setModify] = useState(false);

	useEffect(() =>{
		const verifyLike = async () =>{
			likes.map(it => {
				if(it.username === username){
					setIsLiked(true);
				}
			})
		};

		const verifyFavorite = () => {
			const Favs = JSON.parse(localStorage.getItem("postsFavs"));
			console.log(Favs);
			Favs?.forEach(it => {
				if(it._id === _id){
					setFavorite(true);
				}
			})
				
		}

		verifyLike();
		verifyFavorite();
	},);


	function addComment(comment) {
		const rend = ([...commentCount, { ...comment, user:{username} }]);
		setCommentCount(rend);
	}


	 const handleLike = async () => {
	   try {
		await services.getLikes(_id);
            
		if (!isLiked) {
		  setIsLiked(true);
		  setLikeCount(likeCount + 1);
		}else{
		  setIsLiked(false);
		  setLikeCount(likeCount - 1);
		}
	   } catch (error) {
		   console.log(error);
		}
	};

	const handleFavorite = async () => {
		try {
			await services.setFavorite(_id);

			if(!isFavorite) {
				setFavorite(true);
				
			}
			else if(isFavorite) {
				setFavorite(false);
				
			}

		}catch(error) {
			console.log(error);
		}
	};

	const ShowComments = () =>{
		if(showComment == false)
			setShowComment(true);
		else
			setShowComment(false);
	}

	const handleActive = async () => {
		try {
			await services.setToggle(_id);
			if (!active) {
				setActive(true);
			  }else{
				setActive(false);
			  }

		}catch(error) {
			console.log(error);
		}
	}

	const HandleUpdate = () => {
		if(!modify){
			setModify(true);
		}else{
			setModify(false);
		}
	}

	const onSubmit = async(e) =>{
		e.preventDefault();
        const formData = new FormData(e.target);
		const getPost = await services.getOne(_id);

        const post = Object.fromEntries(formData.entries());
        const token = localStorage.getItem('token');
    
        if(post.title.length < 8 || post.title.length >32) return alert("El titulo debe ser mayor de 8 carácteres");

        if(post.description.length < 8) return alert("La descripción debe ser mayor de 8 carácteres");

        if(!post.image.startsWith('https://')) return alert("La imágen debe ser un link 'https'");

		const res = services.UpdatePost(post.title, post.description, post.image, getPost._id);
			
		console.log(res);

		setModify(false);
	}



	return(
		<div className="flex flex-col border w-screen bg-white m-4 h-1/2 rounded h-auto content-center items-center p-4 font-inter lg:w-full md:w-full">
			<div className="flex flex-row justify-between items-center  p-1 w-full">
				<div className="flex flex-row w-1/2 p-2 items-center">
					<img className="w-1/6 h-1/6 rounded-full border-4 border-pink-200 bg-pink-100" src={userImage}/>
					<div className="flex flex-col ml-2 text-center">
					<p className=" p-2 font-bold">{user}</p>
					<p className="text-sm">{dateCreated}</p>
					</div>

					{
				getRole == "admin" && user == username &&
				(
					<button onClick={handleActive} className={` ${active ? "bg-green-200" : "bg-pink-300"} w-1/2 lg:w-1/4 transition duration-300 ease-in-out rounded-xl text-lg text-semibold  hover:bg-pink-500 p-1 text-white`} >
	            		Activo
					</button>
				)
				}

				{
				getRole === "admin" && user === username &&
				(
					<button onClick={HandleUpdate} className={` m-1 w-1/2 lg:w-2/3 transition duration-300 ease-in-out rounded-xl text-lg text-semibold bg-blue-500 hover:bg-blue-600 p-1 text-white `} >
	            		Actualizar</button>
				)
			}
			{
				modify &&
				(
				<form onSubmit={onSubmit} className="flex flex-col items-center justify-center w-full h-full md:h-full md:p-1 md:m-1 lg:w-3/4 ">
					
						<input type="text" name="title" id="title" placeholder="Titulo" className="font-medium h-1/2 text-gray-900 focus:outline-none rounded-lg bg-pink-50 focus:ring text-center ring-pink-200 w-full p-1 m-1 md:p-1 md:m-1"/>    
					
						<input type="text" name="description" id="description" placeholder="Descripcion" className="font-medium h-1/2 text-gray-900 focus:outline-none p-2 rounded-lg bg-pink-50 focus:ring text-center ring-pink-200 w-full p-1 m-1 md:p-1 md:m-1"/>
					
						<input type="text" name="image" id="image" placeholder="Imagen" className="font-medium h-1/2 text-gray-900 focus:outline-none p-2 rounded-lg bg-pink-50 focus:ring text-center ring-pink-200 w-full p-1 m-1 md:p-1 md:m-1"/>
					
					<button className={` m-1 w-full lg:w-full transition duration-300 ease-in-out rounded-xl text-lg text-semibold bg-blue-500 hover:bg-blue-600 p-1 text-white md:w-full`} >
	            		Actualizar</button>
				</form>
				)
			}
				</div>

			</div>

			<div className="w-11/12  flex justify-center items-center">
			<img src={image} className="  h-full object-contain shadow  lg:w-3/4" alt={`imagen del post`} />
			</div>


			<div className="flex flex-col w-11/12 justify-start items-start h-full">
			<p className="font-bold p-1 ml-1 font-montserrat w-full">{title}</p>
			<p className="w-full p-1 ml-1 whitespace-normal h-5/6 overflow-auto p-2 break-words text-justify">{description}</p>
			</div>
						
			
			<div className="flex flex-row justify-around h-full items-center p-1 m-1 w-full">
				<button  onClick={handleLike} 
				type="button"
				className= {` flex flex-row justify-center items-center rounded p-1 m-1 w-1/5 ` }>
				<BsHeartFill className={` ${isLiked ? `text-red-400 transition duration-500 rotate-360` : "transition duration-500"}  w-1/3 h-1/3 text-gray-400 cursor-pointer`} />
				</button>
				<p>{likeCount} </p>

				<button 
				type="button" 
				className=" flex flex-row justify-center items-center rounded p-1 m-1 w-1/5" onClick={ShowComments}>
				<BsFillChatLeftTextFill className="w-1/3 h-1/3 text-gray-400 cursor-pointer"/>
				</button>
				<p>{commentCount.length}</p>

				<button onClick={handleFavorite}
				className={`flex flex-row justify-center items-center rounded p-1 m-1 w-1/5`}
				>
				<BsStarFill className={` ${isFavorite && `text-yellow-400`} text-xl w-1/3 h-1/3 text-gray-400 cursor-pointer`} />
			</button>
			</div>

			{showComment && (
			<div className="flex flex-col justify-center p-1 w-full bg-gray-50">
					{
					commentCount.map((it =>  
						<div className="flex flex-row w-3/4 p-2 items-center p-1">
						<img className="w-1/6 h-1/6 rounded-full border-4 border-pink-200 bg-pink-100" src={userImage}/>
						<Comment key={shortid.generate()} comment={it} className="w-3/4"/> </div>))
					}
			</div>)}
			<div className="">
					<AddComment id={_id} isSubmit={addComment}/>
			</div>
		</div>
	);
};

export default PostContainer;

     
