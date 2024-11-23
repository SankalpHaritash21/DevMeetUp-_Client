import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    localStorage.removeItem("user");
    dispatch(removeUser());
    return navigate("/login", { replace: true });
  };

  const handleHomeClick = () => {
    if (user) {
      return navigate("/", { replace: true });
    } else {
      return navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <button onClick={handleHomeClick} className="btn btn-ghost text-xl">
            DevMeetUp
          </button>
        </div>
        {user && (
          <div className="flex-none gap-2 mx-5">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt={user?.firstName} src={user?.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <Link to="/setting">Settings</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
