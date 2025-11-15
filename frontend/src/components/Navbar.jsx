// frontend/src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Access user state and logout

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} alt="WasteMap Logo" className="h-10 w-10 mr-2" />
            <Link to="/" className="text-xl font-bold text-gray-800">
              WasteMap
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <>
                <span className="text-gray-800 font-medium">Hello, {user.name}</span>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
