import { useState } from "react";
import { useUserContext } from "../../Contexts/UserContext";
import { Navigate } from "react-router-dom";
import {RiLockPasswordLine, RiUser3Line, RiInstagramLine} from "react-icons/ri";

export default function Login() {
  const { login, token, role} = useUserContext();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onChange = (e, save) => {
    save(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const logged = await login(username, password);

    setError(!logged);
    setUsername("");
    setPassword("");
  
    const roleGoTo = role;  
    console.log(roleGoTo);
  };
  if (token && role){
    return <Navigate replace to="/redirect"/>
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-purple-500 lg:flex-row">
    <div className="bg-purple-500 h-1/4 w-full flex flex-col items-center justify-center content-center md:flex-row md:w-1/2 lg:w-2/5 lg:flex-col">
      <RiInstagramLine className="text-white h-1/2 w-1/2"/>
      <h1 className="text-white text-4xl font-semibold font-inter m-2 md:w-1/2 lg:w-auto">BIENVENIDO</h1>
    </div>
      <main className="w-full h-3/4 p-8 md:p-10 flex flex-col justify-center items-center bg-gray-100 rounded-tr-lg rounded-tl-lg shadow lg:w-2/5 lg:h-4/5 lg:justify-between">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-4 items-center justify-center lg:h-full"
        >
          <h2 className="uppercase text-purple-600 font-monserrat font-semibold text-2xl m-4">
            Iniciar Sesión
          </h2>

          {error && (
            <p className="w-full rounded p-3 text-center text-white font-roboto bg-red-700 select-none">
              Un error ha ocurrido en el inicio de sesión
            </p>
          )}

          <div className="flex flex-row h-1/2">
          <RiUser3Line className="w-1/3 h-1/2 items-center justify-center md:h-3/4 lg:h-2/4"/>
          <input
            className="font-medium w-full h-1/2 text-gray-900 focus:outline-none p-2 rounded bg-pink-50 focus:ring text-center ring-pink-200 md:h-3/4 lg:h-2/4 lg:text-xl"
            type="text"
            value={username}
            placeholder="usuario"
            onChange={(e) => onChange(e, setUsername)}
          />
          </div>

          <div className="flex flex-row h-1/2">
          <RiLockPasswordLine className="w-1/3 h-1/2 items-center justify-center md:h-3/4 lg:h-2/4"/>
          <input
            className="font-medium w-full h-1/2 text-gray-900 focus:outline-none p-2 rounded bg-pink-50 focus:ring ring-pink-200 text-center md:h-3/4 lg:h-2/4 lg:text-xl"
            type="password"
            placeholder="contraseña"
            onChange={(e) => onChange(e, setPassword)}
            value={password}
          />
          </div>

          <button className="mt-6 w-full lg:w-3/4 transition duration-300 ease-in-out rounded text-lg text-extrabold uppercase bg-purple-500 hover:bg-purple-700 py-2 px-4 text-white" >
            Iniciar Sesión{" "}
          </button>
        </form>
      </main>
      
    </div>
  );
}