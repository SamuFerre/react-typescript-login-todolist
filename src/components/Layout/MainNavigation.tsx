import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const MainNavigation = (props: any) => {
  const home = useNavigate();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
      authCtx.logout();
      home('/');
  }
  const name = localStorage.getItem('name');
  return (
    <header className="header">
      {isLoggedIn && <nav className='header__navigation'>
        <a href="/" onClick={logoutHandler}  className='header__button'>Logout</a>
      </nav>
      }
      {!isLoggedIn && <nav className='header__navigation'>
        <a href="/" className='header__button'>Login</a>
      </nav>
      }
      {isLoggedIn && <h1 className="title-center">Hello, {name}</h1>}
      {!isLoggedIn && <h1 className="title-center">Login To Create Your own Todo List</h1>}
    </header>
  );
};

export default MainNavigation;


