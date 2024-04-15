import { useContext } from "react"
import "./navbar.css"
import {Link, useNavigate} from "react-router-dom"
import AuthContext from "../../context/AuthContext"
const Navbar = () => {
  const navigate = useNavigate();
  const { loading, dispatch,user } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem('user');
    // props.showAlert("Logout successfully", "success");
    navigate('/');
  }
  const handlelogin = () => {
    navigate('/login');
  }

  const handleregister = () => {
    navigate('/register');
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
               <span className="logo">Home</span>
        </Link>
   
        {user ? <div> {user.username} <button onClick={handleLogout}>logout</button> </div> : <div className="navItems">
          <button className="navButton" onClick={handleregister}>Register</button>
          <button className="navButton" onClick={handlelogin}>Login</button>
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar