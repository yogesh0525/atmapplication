import { useState, useEffect } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login({ user, setUser }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!accountNumber || !pin) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await login(accountNumber, pin);
      setUser(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] flex justify-center items-center bg-slate-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-3 rounded bg-blue-900 flex items-center justify-center text-white font-bold text-2xl shadow-sm">
            Y
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Annamalai Bank ATM
          </h2>
          <p className="text-slate-500 text-sm mt-1">Please authenticate to access your account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Account Number
            </label>
            <input
              type="text"
              placeholder="Enter account number"
              value={accountNumber}
              className="w-full bg-white border border-slate-300 text-slate-900 p-3 rounded focus:border-blue-900 focus:outline-none transition duration-150 text-sm"
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              PIN
            </label>
            <input
              type="password"
              placeholder="Enter 4-digit PIN"
              maxLength={4}
              value={pin}
              className="w-full bg-white border border-slate-300 text-slate-900 p-3 rounded focus:border-blue-900 focus:outline-none transition duration-150 text-sm tracking-widest"
              onChange={(e) => setPin(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-900 hover:bg-blue-800 text-white py-3 rounded font-bold transition duration-150 cursor-pointer shadow-sm"
          >
            Log In
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-slate-500">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-900 hover:underline cursor-pointer font-semibold transition"
          >
            Create an account
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
