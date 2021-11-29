
import { useUserContext } from '../../Contexts/UserContext';

const PrivateRoute = ({ role, children }) => {
  const { user } = useUserContext();
    if(!user || user.role !== role) return (
  	<div className="flex  flex-col lg:flex-row justify-center items-center w-screen h-screen bg-purple-500">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-9xl font-Monaco font-medium text-center mb-6 text-white">404</h1>
        <h3 className="text-xl font-Monaco font-medium text-center text-white">Página no encontrada</h3>
        <p className="text-lg font-Monaco font-medium text-center text-white">
          La página que buscas requiere de autenticación
        </p>
      </div>
    </div>);
   
  
  return children;
}

export default PrivateRoute;