import { useState, useEffect } from "react";
import API from "../services/api";
import HistoryTable from "../components/HistoryTable";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [amount, setAmount] = useState("");

  if (!user) return null;

  const deposit = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    try {
      const res = await API.put("/deposit", {
        accountNumber: user.accountNumber,
        amount,
      });

      setUser(res.data);
      setAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Deposit failed");
    }
  };

  const withdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    try {
      const res = await API.put("/withdraw", {
        accountNumber: user.accountNumber,
        amount,
      });

      setUser(res.data);
      setAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Withdrawal failed");
    }
  };

  const transactionsList = user && user.transactions ? [...user.transactions].reverse() : [];

  return (
    <div className="min-h-[calc(100vh-68px)] bg-slate-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Balance & Quick Transaction */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Professional Account Card */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-lg p-6 shadow-sm border border-blue-950 select-none">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase tracking-wider opacity-80 font-bold">
                  Yogesh Bank Account
                </span>
                <span className="text-xs font-bold bg-blue-800 px-2 py-1 rounded">
                  DEBIT
                </span>
              </div>

              <div className="my-6">
                <span className="text-[11px] uppercase tracking-wider opacity-70 block mb-1">
                  Available Balance
                </span>
                <span className="text-3xl font-extrabold tracking-tight">
                  ₹ {user.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center border-t border-blue-800/40 pt-4 text-sm">
                <div>
                  <span className="text-[9px] uppercase tracking-wider opacity-60 block">
                    Account Holder
                  </span>
                  <span className="font-semibold">{user.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider opacity-60 block">
                    Account Number
                  </span>
                  <span className="font-mono tracking-wider">{user.accountNumber}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                Make a Transaction
              </h3>
              
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Amount (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-semibold">₹</span>
                  </div>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    className="w-full bg-white border border-slate-300 text-slate-900 pl-8 p-3 rounded focus:border-blue-900 focus:outline-none transition duration-150 text-sm font-semibold"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={deposit}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded font-semibold text-sm transition duration-150 cursor-pointer text-center shadow-sm"
                >
                  Deposit
                </button>

                <button
                  onClick={withdraw}
                  className="bg-rose-600 hover:bg-rose-700 text-white py-3 rounded font-semibold text-sm transition duration-150 cursor-pointer text-center shadow-sm"
                >
                  Withdraw
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Transaction History */}
          <div className="lg:col-span-7">
            <HistoryTable history={transactionsList} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;