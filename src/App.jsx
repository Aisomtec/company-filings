import { FaCheckCircle } from "react-icons/fa";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-lg">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Company Filings
        </h1>

        <p className="text-slate-600 mb-6">
          React + Vite + Tailwind CSS setup is working successfully.
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
          Setup Complete
        </button>
      </div>
    </div>
  );
}

export default App;