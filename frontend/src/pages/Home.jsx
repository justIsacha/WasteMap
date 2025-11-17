// frontend/src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Removed duplicate header - using global Navbar instead */}

      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Simplify Waste Management
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl">
          WasteMap helps landlords and residents request and track waste collection
          efficiently. Pin your location, submit requests, and let our system handle
          the rest.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold"
          >
            Login
          </Link>
        </div>

        {/* Features Section */}
        <section className="mt-16 max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Real-Time Requests</h3>
            <p className="text-gray-600">
              Submit waste collection requests and track them in real-time.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Pin Your Location</h3>
            <p className="text-gray-600">
              Use our interactive map to pinpoint the exact location for collection.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Admin Dashboard</h3>
            <p className="text-gray-600">
              Admins can monitor, update, and manage all requests efficiently.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Clean & Sustainable</h3>
            <p className="text-gray-600">
              Promote a cleaner environment through organized waste management.
            </p>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow py-6 text-center text-gray-600">
        &copy; {new Date().getFullYear()} WasteMap. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;