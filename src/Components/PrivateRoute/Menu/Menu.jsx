import {RiMenuFill, RiInstagramLine} from "react-icons/ri";
import PostForm from "../PostForm/PostForm";
import { useUserContext } from "../../../Contexts/UserContext";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {FaRegUser} from "react-icons/fa";
import {BsPlusSquare, BsCardText} from "react-icons/bs";
import {IoIosLogOut, IoIosStarOutline} from "react-icons/io";
import user from "../../../Assets/Img/Man.png"




export default function Menu() {
	const navigate = useNavigate();
  	const { logout } = useUserContext();
    const role = localStorage.getItem("role_name");

  	const logoutHandler = () => {
	    logout();
	    navigate("/login");
  	};

	const [menu, showMenu] = useState(false);
	const [newPost, showNewPost] = useState(false);
	const [profile, showProfile] = useState(false);
	const [logoutbutton, showLogout] =useState(false);
	const [favo, showFav] = useState(false);
	const [mine, showMine] = useState(false);

  	const showMenuFeed = () => {
    	if(menu == false) {
    		showMenu(true);
        showProfile(false);
      }
    	else {
    		showMenu(false);
    		showNewPost(false);
    		showLogout(false);

    	}
    		
  	}

  	const ShowCreatePost = () => {
	    if(newPost == false) {
	    	showNewPost(true);
	  		showLogout(false);
	    }
	    else 
	    	showNewPost(false);

	}

	const ShowLogout = () => {
		if(logoutbutton == false) {
			showLogout(true);
    		showNewPost(false);
		}
		else
			showLogout(false);

	}

  const ShowProfile = () =>{
    if(profile == false)
    {
      showProfile(true);
      showMenu(false);
    }
    else
      showProfile(false);

  }


	const ShowFavs = () => {
	    navigate("/Favorites");
	    if(favo == false) {
	    	showFav(true);
	    }
	    else
	    	showFav(false);	
	}

	const ShowMines = () => {
	    navigate("/Posts");
	    if(mine == false) {
	    	showMine(true);
	    }
	    else
	    	showMine(false);	
	}

	const goBack = () => {
		navigate("/");
	}




    return (
    	<header className="flex flex-col h-1/5 w-full justify-around items-center font-inter sticky top-0 relative text-white ">
    		<div className="flex flex-row h-auto w-full bg-purple-400 justify-between p-2 font-bold md:p-1 text-center">
            <button className={` w-1/4 h-1/6 cursor-pointer text-bold align-middle`} >
            	<RiMenuFill className={` ${menu ? "transition duration-500 origin-center transform rotate-90 scale-75 bg-purple-500 rounded-xl " : "transition duration-500 " } text-white w-1/2 h-1/2 md:h-14 md:h-14 lg:h-16 lg:w-16 lg:ml-2`} onClick={showMenuFeed}/>
            </button>
         
         	<button className={` w-1/4 h-1/6 cursor-pointer text-center text-bold align-middle `} onClick={goBack}>
            	<RiInstagramLine className={`text-white w-1/2 h-1/2 md:h-14 md:h-14 lg:h-16 lg:w-16`}/>
            </button>

          	<button className={`  w-1/4 h-1/6 cursor-pointer text-center flex flex-row text-white text-bold text-xl align-middle`} >
            	<img className={` ${profile ? "bg-pink-600 border-pink-500 transition duration-500" : "transition duration-500"} w-1/2 h-1/2 shadow-lg rounded-full border-4 border-pink-200 bg-pink-100 md:h-1/4 md:w-1/4 lg:h-1/5 lg:w-1/5`} src={user} onClick={ShowProfile}/>
          	</button>
          	</div>

          
            {menu && (
          	<div className="text-center bg-blue-300  w-5/6 rounded-b-lg h-auto absolute left-0 top-full text-xl md:w-2/3 lg:w-1/5 ">
              {role == 'admin' && (
                <div className={` ${newPost ? " transition duration-500 bg-blue-500 rounded-lg " : "transition duration-500"} m-2 p-4 flex flex-row justify-center items-center md:p-2 md:m-1 lg:p-4 lg:m-2`}>
                <BsPlusSquare className={` ${newPost ? "transition duration-500 origin-center transform rotate-90" : "transition duration-500 "} w-1/6 h-1/6 md:h-14 md:h-14 lg:m-2 ` }/>
                <button className={` w-1/2 text-semibold h-1/6 lg:m-2 lg:p-2`} onClick={ShowCreatePost}>Crear Post</button>
              </div>)
              }
          		
              {
                role == 'admin' && (
                  <div className={` ${mine ? " transition duration-500 bg-blue-500 rounded-lg" : "transition duration-500"} m-2 p-4 flex flex-row justify-center items-center md:p-2 md:m-1 lg:p-4 lg:m-2`}>
                  <BsCardText className={` ${mine ? "transition duration-500 origin-center transform rotate-90" : "transition duration-500 "} w-1/6 h-1/6 md:h-14 md:h-14 lg:m-2` }/>
                <button className="w-1/2 text-semibold h-1/2 lg:m-2 lg:p-2" onClick={ShowMines}>Mis Posts</button> 
                </div>
                  )
              }	
          		<div className={` ${favo ? " transition duration-500 bg-blue-500 rounded-lg" : "transition duration-500"} m-2 p-4 flex flex-row justify-center items-center md:p-2 md:m-1 lg:p-4 lg:m-2`}>
          			<IoIosStarOutline className={` ${favo ? "transition duration-500 origin-center transform rotate-90" : "transition duration-500 "} w-1/6 h-1/6 md:h-14 md:h-14 lg:m-2` }/>
          			<button className="w-1/2 text-semibold h-1/2 lg:m-2 lg:p-2" onClick={ShowFavs}>Favoritos</button> 
          		</div>
          		<div className={` ${logoutbutton ? " transition duration-500 bg-blue-500 rounded-lg" : "transition duration-500"} m-2 p-4 flex flex-row justify-center items-center md:p-2 md:m-1 lg:p-4 lg:m-2 lg:relative `}>
          			<IoIosLogOut className={` ${logoutbutton ? "transition duration-500 origin-center transform rotate-90 lg:-rotate-90" : "transition duration-500 "} w-1/6 h-1/6 md:h-14 md:h-14 lg:m-2` }/>
          			<button className=" w-1/2 text-semibold h-1/2 lg:m-2 lg:p-2" onClick={ShowLogout}>Cerrar Sesión</button> 
          		</div>

          	</div>)}


          { newPost && (
          	<div className="w-full lg:w-1/4 bg-purple-300 h-1/2 rounded-br-xl md:h-1/5 lg:absolute lg:left-1/4 lg:w-4/6 lg:h-auto lg:top-full">
	        <h4 className="font-inter font-bold text-xl lg:text-6xl text-gray-800 text-center m-2">Nuevo Post</h4>
	        <PostForm className="w-full "/>
	      	</div>)}

          { profile && (
            <div className="w-full bg-purple-300 h-auto rounded-br-xl rounded-bl-xl md:h-3/5 lg:absolute lg:right-0 lg:w-1/2 lg:h-3/5  lg:top-full text-white absolute right-0 top-full  md:w-1/2">
          <h4 className="font-inter font-bold text-xl lg:text-2xl text-white text-center m-2"> ¡Bienvenido {role}!</h4>
          </div>)}

	   		{logoutbutton && (
	   			<button
		          onClick={logoutHandler}
		         className=" w-full lg:w-3/4 h-3/4 transition duration-300 ease-in-out rounded-br-xl text-lg text-extrabold bg-purple-500 hover:bg-purple-700 text-white p-4 lg:absolute  lg:w-1/5 lg:h-auto lg:left-0">Cerrar Sesión
		        </button>)}
	   	      	
      </header>
    );
}