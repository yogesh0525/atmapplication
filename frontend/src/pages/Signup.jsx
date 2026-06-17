import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    accountNumber: "",
    name: "",
    pin: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.accountNumber || !form.name || !form.pin) {
      alert("All fields are required");
      return;
    }

    if (form.pin.length !== 4) {
      alert("PIN must be exactly 4 digits");
      return;
    }

    try {
      await API.post("/register", form);
      alert("Account Created Successfully! You can now log in.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] flex justify-center items-center bg-slate-50 px-4">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-3 rounded bg-blue-900 flex items-center justify-center text-white font-bold text-2xl shadow-sm">
            Y
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Create Account
          </h2>
          <p className="text-slate-500 text-sm mt-1">Open a new bank account instantly</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-white border border-slate-300 text-slate-900 p-3 rounded focus:border-blue-900 focus:outline-none transition duration-150 text-sm"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Account Number
            </label>
            <input
              type="text"
              placeholder="Choose an account number"
              className="w-full bg-white border border-slate-300 text-slate-900 p-3 rounded focus:border-blue-900 focus:outline-none transition duration-150 text-sm"
              onChange={(e) =>
                setForm({
                  ...form,
                  accountNumber: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              4-Digit PIN
            </label>
            <input
              type="password"
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              className="w-full bg-white border border-slate-300 text-slate-900 p-3 rounded focus:border-blue-900 focus:outline-none transition duration-150 text-sm tracking-widest"
              onChange={(e) =>
                setForm({
                  ...form,
                  pin: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-900 hover:bg-blue-800 text-white py-3 rounded font-bold transition duration-150 cursor-pointer shadow-sm"
          >
            Create Account
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-slate-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-900 hover:underline cursor-pointer font-semibold transition"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;