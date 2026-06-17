import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-blue-900 text-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          onClick={() => navigate(user ? "/dashboard" : "/")}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-blue-900 font-bold text-lg">
            Y
          </div>
          <span className="text-xl font-bold tracking-tight">
            Yogesh Bank
          </span>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium opacity-90">
              Welcome, {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-blue-800 hover:bg-blue-700 text-white border border-blue-700/50 px-4 py-1.5 rounded text-sm font-semibold transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;