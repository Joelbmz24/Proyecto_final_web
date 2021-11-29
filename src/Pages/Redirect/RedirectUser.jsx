import { useUserContext } from "../../Contexts/UserContext";
import { Navigate } from "react-router-dom";

const rolePages = {
  admin: "/admin",
  user: "/user",
};

const RedirectUser = () => {
  const { user } = useUserContext();

  if (!user) return (
  <div className="bg-yellow-50 min-h-screen flex items-center min-w-full">
  <h2 className="font-Georgia font-bold text-5xl lg:text-6xl text-gray-800 text-center">
          No se puede redireccionar
  </h2>
  </div>
   );

  return <Navigate replace to={rolePages[user.role] ?? "/"} />;
};

export default RedirectUser;