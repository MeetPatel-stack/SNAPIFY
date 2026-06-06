import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function BottomNav() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md">
      <div className="max-w-md mx-auto flex justify-around py-3">

        <Link
          to="/feed"
          className={`font-medium ${
            location.pathname === '/feed'
              ? 'text-blue-500'
              : 'text-gray-500'
          }`}
        >
          🏠 Home
        </Link>

        <Link
          to={`/profile/${user._id}`}
          className={`font-medium ${
            location.pathname.includes('/profile')
              ? 'text-blue-500'
              : 'text-gray-500'
          }`}
        >
          👤 Profile
        </Link>

      </div>
    </footer>
  );
}