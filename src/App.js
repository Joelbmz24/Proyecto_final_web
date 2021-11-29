import Login from './Pages/Login/login';
import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import RequireAuth from './Components/PrivateRoute/PrivateRoute';
import Redirect from './Pages/Redirect/RedirectUser';
import User from './Pages/User/user';
import Admin from './Pages/Admin/admin';
import NotFound from './Pages/NotFound/NotFound';
import Favorites from './Pages/Favorites/Favorites';
import Owned from './Pages/Owned/Owned';



function App() {
  return (
  <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/Favorites" element={<Favorites/>} />
        <Route path="/Posts" element={
          <RequireAuth role="admin">
          <Owned />
          </RequireAuth>
        }
        />
        <Route
          path="/user"
          element={
            <RequireAuth role="user">
              <User />
            </RequireAuth>
          } />
        <Route
          path="/admin"
          element={
            <RequireAuth role="admin">
              <Admin />
            </RequireAuth>
          } />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
