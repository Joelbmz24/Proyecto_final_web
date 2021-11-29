import {IoSadOutline} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate("/login");
  };

  return (
    <div className="flex  flex-col lg:flex-row justify-center items-center w-screen h-screen bg-purple-500">
      <IoSadOutline className="m-4 lg:h-1/2 lg:w-1/6 text-white text-9xl" />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-9xl font-Monaco font-medium text-center mb-6 text-white">404</h1>
        <h3 className="text-xl font-Monaco font-medium text-center text-white">Página no encontrada</h3>
        <p className="text-lg font-Monaco font-medium text-center text-white">
          La página que buscas no existe u otro error ha ocurrido
        </p>
        <button
          className=" font-inter mt-6 w-full lg:w-3/4 transition duration-300 ease-in-out rounded text-lg text-extrabold uppercase bg-pink-200 hover:bg-pink-600 py-2 px-4 text-black" 
          onClick={(e) => onClick(e)}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default NotFound;