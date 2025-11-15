// frontend/src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
