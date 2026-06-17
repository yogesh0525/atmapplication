const HistoryTable = ({ history }) => {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm flex flex-col h-full min-h-[400px]">
      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">
        Transaction History
      </h3>

      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 rounded-lg">
          <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200 flex items-center justify-center mb-2">
            <span className="text-slate-400 font-bold text-md">⇄</span>
          </div>
          <p className="text-slate-600 font-medium text-sm">No transactions yet</p>
          <p className="text-xs text-slate-400 mt-1">Make your first deposit or withdrawal to see records here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded border border-slate-200 bg-slate-50/50">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
                <th className="p-3 text-left font-semibold">Type</th>
                <th className="p-3 text-right font-semibold">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {history.map((item, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-slate-100/50 transition-colors duration-150"
                >
                  <td className="p-3 text-left font-medium">
                    <span 
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                        item.type === "Deposit" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td 
                    className={`p-3 text-right font-bold text-sm tracking-tight ${
                      item.type === "Deposit" ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {item.type === "Deposit" ? "+" : "-"} ₹ {Number(item.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryTable;