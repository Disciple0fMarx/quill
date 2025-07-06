// src/components/layout/Header.tsx
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuthContext();

  return (
    <header>
      <div>
        {/* Logo */}
        <Link to="/">Quill</Link>

        {/* Navigation */}
        <nav>
          {user ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/profile">Profile</Link>
              {user.role === 'READER' && (
                <Link to="/apply">Become an Author</Link>
              )}
              {user.role === 'ADMIN' && (
                <Link to="/admin/applications">Author Applications</Link>
              )}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
